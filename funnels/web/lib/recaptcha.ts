"use client";

/**
 * reCAPTCHA v3 en el front.
 *
 * La clave de SITIO es publica por diseno: viaja en el HTML de cualquier web
 * que use reCAPTCHA. La privada es la secreta, y esa vive en el backend
 * (RECAPTCHA_SECRET, en backend/infra/.env.prod).
 *
 * OJO CON DE DONDE SALE ESTA CLAVE. La primera version puso aqui la que
 * aparecia en un comentario del stack de formularios del WordPress
 * ("Secret key de reCAPTCHA v3 (sitekey 6Le240At...)"), y ese comentario
 * estaba obsoleto: no era pareja del secreto desplegado. Resultado, el 30/09,
 * al activar la verificacion: Google respondia 'invalid-keys' y la API
 * rechazaba TODOS los envios. La buena es la que el HTML del WordPress usaba
 * de verdad, la de aqui abajo, que ademas comparte prefijo con el secreto.
 * Si alguna vez hay que cambiarla, la fuente fiable es el par que acepta
 * siteverify, no un comentario.
 *
 * El script NO se carga al entrar en la web: se carga la primera vez que
 * alguien empieza a rellenar un formulario. Dos motivos. Uno, no cargar un
 * tercero de Google a cada visitante que solo viene a leer. Dos, rendimiento:
 * son unos 300 KB que la mayoria de visitas no necesitan.
 *
 * El token caduca a los dos minutos, y el funnel tiene cinco pasos: por eso se
 * pide en el momento de enviar y no antes.
 */

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LetOf8sAAAAAN5JFTmc8Aqah3Dcs8MC7zqwcsfo";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let carga: Promise<void> | null = null;

/**
 * Carga el script una sola vez, aunque se llame desde varios formularios.
 * Se puede llamar en cuanto se intuye que habra un envio: adelantar la carga
 * evita que el primer envio tenga que esperarla.
 */
export function precargarRecaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (carga) return carga;

  carga = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Un bloqueador de anuncios o una red capada dejan el script fuera.
      // Se reinicia para que un segundo intento vuelva a probarlo.
      carga = null;
      reject(new Error("No se ha podido cargar reCAPTCHA"));
    };
    document.head.appendChild(script);
  });

  return carga;
}

/**
 * Devuelve el token del envio, o undefined si no se ha podido obtener.
 *
 * Quien llama tiene que decidir que hacer con el undefined. Con la
 * verificacion activada en el backend, enviar sin token da un 400: conviene
 * avisar a la persona y ofrecerle el telefono o el WhatsApp en vez de dejarla
 * dando al boton sin entender por que no pasa nada.
 */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  try {
    await precargarRecaptcha();
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return undefined;

    return await new Promise<string | undefined>((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(
          (token) => resolve(token),
          () => resolve(undefined),
        );
      });
    });
  } catch {
    return undefined;
  }
}

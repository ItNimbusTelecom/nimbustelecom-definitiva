const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const NIMBUS_LOGO_URL = `${PUBLIC_BASE_PATH}/brand/nimbus-logo-header.png`;
export const NIMBUS_ANTENNA_IMAGE = `${PUBLIC_BASE_PATH}/brand/nimbus-antenna.webp`;
export const NIMBUS_STOREFRONT_IMAGE = `${PUBLIC_BASE_PATH}/brand/nimbus-storefront.webp`;
export const NIMBUS_FAVICON_32 = `${PUBLIC_BASE_PATH}/brand/favicon-32x32.png`;
export const NIMBUS_FAVICON_192 = `${PUBLIC_BASE_PATH}/brand/favicon-192x192.png`;
export const NIMBUS_APPLE_TOUCH_ICON = `${PUBLIC_BASE_PATH}/brand/apple-touch-icon.png`;
export const NIMBUS_MS_TILE_IMAGE = `${PUBLIC_BASE_PATH}/brand/mstile-270x270.png`;
export const NIMBUS_WIMAX_IMAGE = `${PUBLIC_BASE_PATH}/brand/nimbus-wimax.jpg`;
export const NIMBUS_SECURITY_IMAGES = [
  { src: `${PUBLIC_BASE_PATH}/brand/nimbus-seguridad-puerto.webp`, alt: "Càmeres de videovigilància en un port instal·lades per Nimbus Telecom" },
  { src: `${PUBLIC_BASE_PATH}/brand/nimbus-seguridad-masia.webp`, alt: "Càmeres de seguretat en una masia instal·lades per Nimbus Telecom" },
  { src: `${PUBLIC_BASE_PATH}/brand/nimbus-seguridad-poste.webp`, alt: "Càmeres de vigilància en un pal instal·lades per Nimbus Telecom" },
];
/**
 * Vídeos por servicio en la sección "En detall" de /seguridad/, en el mismo
 * orden que content.services.items en lib/security.ts (CCTV, Alarmes, Accessos).
 * Cada servicio admite uno o varios vídeos: con uno se muestra grande y centrado;
 * con varios, en cuadrícula de dos columnas. Para añadir otro vídeo a un servicio,
 * coloca el .mp4 (y su poster .jpg) en funnels/web/public/brand/videos/ y añade
 * una entrada { src, poster } a su lista.
 */
export const NIMBUS_SECURITY_VIDEOS: { src: string; poster: string }[][] = [
  [
    {
      src: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-cctv.mp4`,
      poster: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-cctv-poster.jpg`,
    },
    {
      src: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-cctv-2.mp4`,
      poster: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-cctv-2-poster.jpg`,
    },
  ],
  [
    {
      src: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-alarmas.mp4`,
      poster: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-alarmas-poster.jpg`,
    },
  ],
  [
    {
      src: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-accesos.mp4`,
      poster: `${PUBLIC_BASE_PATH}/brand/videos/nimbus-seguridad-accesos-poster.jpg`,
    },
  ],
];
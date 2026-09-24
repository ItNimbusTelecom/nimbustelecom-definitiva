import { localBusinessJsonLd } from "@/lib/structuredData";

/**
 * La ficha de negocio va en la home y solo en la home: repetirla en cada
 * pagina no aporta nada y multiplica el sitio donde corregirla.
 */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
    />
  );
}

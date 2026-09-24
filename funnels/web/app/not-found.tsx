import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

// GitHub Pages sirve este HTML con codigo 404, pero el noindex evita que la
// pagina acabe en el indice si alguien la enlaza por accidente.
export const metadata: Metadata = {
  title: "Pàgina no trobada | Nimbus Telecom",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}

import type { Metadata } from "next";
import { SecurityContent } from "@/components/SecurityContent";
import { SECURITY_CONTENT } from "@/lib/security";
import { openGraphFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: SECURITY_CONTENT.ca.meta.title,
  description: SECURITY_CONTENT.ca.meta.description,
  alternates: { canonical: "/seguridad/" },
  openGraph: openGraphFor(SECURITY_CONTENT.ca.meta.title, SECURITY_CONTENT.ca.meta.description),
};

export default function SecurityPage() {
  return <SecurityContent />;
}

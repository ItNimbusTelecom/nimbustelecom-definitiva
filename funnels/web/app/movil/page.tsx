import type { Metadata } from "next";
import { MobilePageContent } from "@/components/MobilePageContent";
import { MOBILE_DESCRIPTION, MOBILE_TITLE, openGraphFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: MOBILE_TITLE,
  description: MOBILE_DESCRIPTION,
  alternates: { canonical: "/movil/" },
  openGraph: openGraphFor(MOBILE_TITLE, MOBILE_DESCRIPTION),
};

export default function MobilePage() {
  return <MobilePageContent />;
}

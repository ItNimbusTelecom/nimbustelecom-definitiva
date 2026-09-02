import type { Metadata } from "next";
import { BusinessContent } from "@/components/BusinessContent";
import { BUSINESS_CONTENT } from "@/lib/business";
import { openGraphFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: BUSINESS_CONTENT.ca.meta.title,
  description: BUSINESS_CONTENT.ca.meta.description,
  alternates: { canonical: "/empreses/" },
  openGraph: openGraphFor(BUSINESS_CONTENT.ca.meta.title, BUSINESS_CONTENT.ca.meta.description),
};

export default function BusinessPage() {
  return <BusinessContent />;
}

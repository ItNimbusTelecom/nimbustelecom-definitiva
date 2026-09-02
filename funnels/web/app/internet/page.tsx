import type { Metadata } from "next";
import { InternetContent } from "@/components/InternetContent";
import { INTERNET_CONTENT } from "@/lib/internet";
import { openGraphFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: INTERNET_CONTENT.ca.meta.title,
  description: INTERNET_CONTENT.ca.meta.description,
  alternates: { canonical: "/internet/" },
  openGraph: openGraphFor(INTERNET_CONTENT.ca.meta.title, INTERNET_CONTENT.ca.meta.description),
};

export default function InternetPage() {
  return <InternetContent />;
}
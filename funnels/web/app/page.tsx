import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { HOME_DESCRIPTION, HOME_TITLE, openGraphFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: openGraphFor(HOME_TITLE, HOME_DESCRIPTION),
};

export default function HomePage() {
  return <HomePageContent />;
}

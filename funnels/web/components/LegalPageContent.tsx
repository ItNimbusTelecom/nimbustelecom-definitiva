"use client";

import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HUB_CONTENT } from "@/lib/hub";
import type { LegalDocument } from "@/lib/legal";
import { I18nProvider, useI18n } from "@/lib/i18n";

export function LegalPageContent({ document }: { document: LegalDocument }) {
  return (
    <I18nProvider>
      <LegalContent document={document} />
    </I18nProvider>
  );
}

function LegalContent({ document }: { document: LegalDocument }) {
  const { locale } = useI18n();
  const content = HUB_CONTENT[locale];

  return (
    <>
      <Header
        logoHref="/"
        navItems={[
          { label: content.nav.company, href: "/#qui-som" },
          { label: content.nav.services, href: "/#serveis" },
          { label: content.nav.reviews, href: "/#opinions" },
          { label: content.nav.contact, href: "/#contacte" },
          { label: content.nav.business, href: "/empreses/", highlight: true },
        ]}
        ctaLabel={content.primaryCta}
        ctaHref="/#serveis"
      />

      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
          {document.title}
        </h1>

        {/* El texto legal solo existe en castellano: es la version con validez
            juridica. Avisamos cuando el usuario navega en otro idioma. */}
        {locale !== "es" ? (
          <p className="mt-4 rounded-lg border border-nimbus-line bg-nimbus-sand/40 px-4 py-3 text-sm text-nimbus-muted">
            {locale === "ca"
              ? "Aquest text legal es publica en castellà, que és la versió amb validesa jurídica."
              : "This legal text is published in Spanish, which is the legally binding version."}
          </p>
        ) : null}

        <div className="mt-8 space-y-5">
          {document.blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="pt-4 text-lg font-black tracking-tight text-nimbus-ink md:text-xl"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={index} className="list-disc space-y-2 pl-5 text-nimbus-muted">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="leading-7">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="leading-7 text-nimbus-muted">
                {block.text}
              </p>
            );
          })}
        </div>
      </main>

      <Footer anchorId="pie" />
      <CookieConsent />
    </>
  );
}

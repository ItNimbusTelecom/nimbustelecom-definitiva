"use client";

import { DOC_LINKS, LEGAL_LINKS } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";

const LINKTREE_URL = "https://linktr.ee/nimbustelecom";

export function Footer({ anchorId = "contacto" }: { anchorId?: string }) {
  const { dictionary } = useI18n();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    fetch(window.location.href, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        const serverDate = response.headers.get("Date");
        if (!serverDate) return;
        const serverYear = new Date(serverDate).getFullYear();
        if (serverYear > 2000) setYear(serverYear);
      })
      .catch(() => {});
  }, []);

  return (
    <footer id={anchorId} className="border-t border-nimbus-line bg-white pb-24 md:pb-0">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm leading-7 text-nimbus-muted">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <nav aria-label={dictionary.footer.docsAria} className="flex flex-wrap items-center justify-center gap-x-2">
              {DOC_LINKS.map((link, index) => (
                <span key={link.href} className="inline-flex items-center gap-x-2">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <a
                    className="transition hover:text-nimbus-orange"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dictionary.footer.docsLinks[index]}
                  </a>
                </span>
              ))}
            </nav>

            <nav aria-label={dictionary.footer.legalAria} className="mt-3 flex flex-wrap items-center justify-center gap-x-2">
              {LEGAL_LINKS.map((link, index) => (
                <span key={link.href} className="inline-flex items-center gap-x-2">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <a
                    className="font-bold transition hover:text-nimbus-orange"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dictionary.footer.legalLinks[index]}
                  </a>
                </span>
              ))}
            </nav>

            <p className="mt-3">
              © {year} Nimbus Telecom. {dictionary.footer.rights}
              <br />
              {dictionary.footer.officialLinksPrefix}:{" "}
              <a
                href={LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-nimbus-ink transition hover:text-nimbus-orange"
              >
                {dictionary.footer.officialLinksCta}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

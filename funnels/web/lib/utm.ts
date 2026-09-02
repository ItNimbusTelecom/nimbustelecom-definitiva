"use client";

export type LeadSource = {
  path: string;
  search: string;
  hash: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

export function getLeadSource(): LeadSource {
  if (typeof window === "undefined") {
    return {
      path: "",
      search: "",
      hash: "",
      referrer: "",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    path: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    referrer: document.referrer,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
}

// Sustituye el next.config.ts de cada funnel por este.
// Anade soporte de basePath para poder servir el funnel como
// subruta del dominio principal (ej. nimbustelecom.cat/movil/).
//
// Probado: con NEXT_PUBLIC_BASE_PATH=/movil todos los assets salen
// prefijados correctamente (/movil/_next/..., /movil/brand/...).

import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
};

export default nextConfig;

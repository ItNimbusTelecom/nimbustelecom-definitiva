import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Oculta el boton flotante de herramientas de desarrollo de Next.
  // Solo afecta a `npm run dev`; en produccion nunca aparece.
  devIndicators: false,

  ...(isGitHubPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
};

export default nextConfig;

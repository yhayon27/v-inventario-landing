import type { MetadataRoute } from "next";

const BASE_URL = "https://v-inventario-landing.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`,           lastModified, priority: 1.0 },
    { url: `${BASE_URL}/privacidad`, lastModified, priority: 0.5 },
    { url: `${BASE_URL}/terminos`,   lastModified, priority: 0.5 },
  ];
}

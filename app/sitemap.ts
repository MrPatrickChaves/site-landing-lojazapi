import type { MetadataRoute } from "next";
import { modelStores } from "../lib/store-data";

export const dynamic = "force-static";

const baseUrl = "https://lojazapi.flexyweb.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/modelos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...modelStores.map((store) => ({
      url: `${baseUrl}/modelos/${store.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/loja/lojinha-sabrine`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

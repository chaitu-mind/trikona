import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { capabilities } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const at = (p: string) => `${site.url}${p}`;

  return [
    { url: at("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: at("/works/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: at("/services/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: at("/about/"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: at("/process/"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: at("/faq/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: at("/contact/"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    ...capabilities.map((c) => ({
      url: at(`/services/${c.slug}/`), lastModified: now,
      changeFrequency: "yearly" as const, priority: 0.8,
    })),
    ...works.map((w) => ({
      url: at(`/works/${w.slug}/`), lastModified: now,
      changeFrequency: "yearly" as const, priority: 0.6,
    })),
  ];
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Single-page portfolio: the homepage is the only indexable URL. Section
 * anchors (#about, #projects…) are not separate pages and must not be listed.
 * The trailing slash matches the canonical tag exactly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

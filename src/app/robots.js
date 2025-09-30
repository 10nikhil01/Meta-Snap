import { getSiteUrl } from "@/utils/getSiteURL";

export default function robots() {
      const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

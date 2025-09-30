// app/api/fetch-metadata/route.js
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate scheme (only allow http/https)
    if (!/^https?:\/\//i.test(url.toString())) {
      return NextResponse.json(
        { error: "Only HTTP/HTTPS URLs are allowed" },
        { status: 400 }
      );
    }

    // Try fetching
    let res;
    try {
      res = await fetch(url.toString(), { redirect: "follow" });
    } catch {
      return NextResponse.json(
        { error: "Error:404 URL Not Found" },
        { status: 400 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${res.status}` },
        { status: 400 }
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const metaData = [];

    // Title
    const title = $("title").text();
    if (title) metaData.push({ name: "title", content: title });

    // Meta tags
    $("meta").each((_, el) => {
      const name = $(el).attr("name");
      const property = $(el).attr("property");
      const content = $(el).attr("content");
      if ((name || property) && content) {
        metaData.push({ name: name || property, content });
      }
    });

    // Links
    const allowedRels = [
      "author",
      "manifest",
      "bookmarks",
      "canonical",
      "alternate",
      "icon",
    ];
    $("link").each((_, el) => {
      const rel = $(el).attr("rel");
      const href = $(el).attr("href");
      if (rel && href && allowedRels.includes(rel)) {
        metaData.push({ name: rel, content: href });
      }
    });

    // ------------------------
    // Schema Data (JSON-LD)
    // ------------------------
    // Schema Data Parsing
    const schemaData = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html());
            console.log(json)
        if (Array.isArray(json["@graph"])) {
          // If @graph exists, push each item
          json["@graph"].forEach((item) => schemaData.push(item));
        } else if (json["@type"]) {
          // Single top-level schema
          schemaData.push(json);
        }
      } catch (err) {
        // Ignore invalid JSON
      }
    });

    // ------------------------
    // Breadcrumbs
    // ------------------------
    const breadcrumbs = [];

    // From schema.org BreadcrumbList
    schemaData.forEach((schema) => {
      if (
        schema["@type"] === "BreadcrumbList" &&
        Array.isArray(schema.itemListElement)
      ) {
        schema.itemListElement.forEach((item) => {
          breadcrumbs.push({
            name: item.name,
            url: item.item,
          });
        });
      }
    });

    // From HTML structure
    $('nav[aria-label="breadcrumb"] li, ol.breadcrumb li').each((_, el) => {
      const name = $(el).text().trim();
      const url = $(el).find("a").attr("href") || null;
      if (name) {
        breadcrumbs.push({ name, url });
      }
    });

    // ------------------------
    // Final Response
    // ------------------------
    return NextResponse.json({
      metaData,
      schemaData,
      breadcrumbs,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}

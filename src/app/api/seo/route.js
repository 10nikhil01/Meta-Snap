import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!/^https?:\/\//i.test(url.toString())) {
      return NextResponse.json(
        { error: "Only HTTP/HTTPS URLs are allowed" },
        { status: 400 }
      );
    }

    // Fetch target site
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

    // Collect metadata
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

    // Link tags (canonical, icon, manifest, etc.)
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

    return NextResponse.json({ metaData });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}

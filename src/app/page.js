"use client";

import { useState } from "react";
import Loading from "@/component/Loading";
import ErrorBox from "@/component/Error";
import SeoResult from "@/component/SeoResult";
import { structuredData } from "@/component/structuredData";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();

  const handleFetch = async () => {
    if (!url) {
      setError("URL required");
      return null;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result = await res.json();
      if (result.error) throw new Error(result.error);

      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-h-dvh min-h-dvh py-2 sm:p-10 bg-background flex items-center justify-center flex-col w-full">
        <div className="md:w-xl md:mx-auto max-md:w-full bg-background/10 rounded-2xl sm:border-foreground/20 sm:border-1">
          <div className="sm:px-6 px-2">
            <h1 className="sm:text-2xl text-lg font-bold my-4 sm:mb-4 text-center">
              Meta Snap
            </h1>

            <input
              type="text"
              placeholder="Enter website URL"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <button
              onClick={handleFetch}
              disabled={loading}
              className="w-full bg-blue-600 mb-4 sm:mb-8 text-foreground py-2 rounded hover:bg-blue-700"
            >
              Get SEO Data
            </button>
          </div>

          {loading && <Loading />}
          {error && <ErrorBox message={error} />}
          {data && <SeoResult data={data} />}
        </div>
      </div>
    </>
  );
}

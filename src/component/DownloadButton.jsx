// components/DownloadButton.js
"use client";
import { generatePDF } from "@/utils/generatePdf";

export default function DownloadButton({ data }) {
  return (
    <button
      onClick={() => generatePDF(data.metaData)}
      className="mt-4 mx-2 sm:mx-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
}

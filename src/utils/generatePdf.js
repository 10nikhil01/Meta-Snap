import jsPDF from "jspdf";

export function generatePDF(metaData) {
  const doc = new jsPDF();

  // 🔠 Helper to capitalize keys
  const formatKey = (key) => {
    return key
      .split(/[-:]/) // split on "-" or ":"
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const appName = metaData
    .find((item) => item.name === "application-name")
    ?.content.replace(/\s+/g, "-");

  // 🏷 Heading
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`SEO Metadata Report of ${appName || "Your App"}`, 10, 20);

  let y = 35;
  doc.setFontSize(12);

  if (!Array.isArray(metaData) || metaData.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.text("No metadata found.", 10, y);
  } else {
    metaData.forEach((item, index) => {
      if (!item.name || !item.content) return;

      const key = `${index + 1}. ${formatKey(item.name)}: `;
      const value = item.content;

      // ✅ Bold key
      doc.setFont("helvetica", "bold");
      doc.text(key, 10, y);

      // ✅ Normal value (placed right after key)
      const keyWidth = doc.getTextWidth(key);
      doc.setFont("helvetica", "normal");

      const splitValue = doc.splitTextToSize(value, 180 - keyWidth);
      doc.text(splitValue, 10 + keyWidth, y);

      y += Math.max(splitValue.length, 1) * 7;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
  }

  doc.save(`Seo-Report${appName ? "-" + appName : ""}.pdf`);
}

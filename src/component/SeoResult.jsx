export default function SeoResult({ data }) {
  if (!data) return null;

  return (
    <div className="my-4">
      {data.metaData?.length > 0 ? (
        <ul className="space-y-3 px-2 sm:px-6">
          {data.metaData.map((item, idx) => (
            <li
              key={idx}
              className="p-3 rounded-lg border-1 bg-background hover:bg-blue-100/10 transition"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-blue-600 uppercase">
                  {item.name}
                </span>
                <span className="text-sm text-foreground break-all">
                  {item.content}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-blue-600 text-base my-6 text-center">
          No meta tags found
        </p>
      )}
    </div>
  );
}

import Grid from "../flowersection/Grid";

async function getFlowers(page: number, limit: number) {
  const res = await fetch(`http://localhost:3001/flowers?_page=${page}&_limit=${limit}`, {
    cache: "no-store",
  });
  const totalCount = res.headers.get("X-Total-Count");
  const data = await res.json();
  return { data, totalCount: Number(totalCount) };
}

export default async function FlowersPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1;
  const limit = 6;

  const { data: flowers, totalCount } = await getFlowers(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-xl font-bold mb-6">همه گل‌ها</h1>
      <Grid flowers={flowers} />

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i + 1}
            href={`/flowers?page=${i + 1}`}
            className={`px-3 py-1 rounded ${
              i + 1 === page ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
}

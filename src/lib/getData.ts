export async function getData(
  type: "flowers" | "collections" | "articles",
  page: number = 1,
  limit: number = 6
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/data?type=${type}&page=${page}&limit=${limit}`,
    {
      cache: "no-cache",
    }
  );
 
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}

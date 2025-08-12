import Container from "@/components/container";
import ProductItem, { IProductList } from "@/components/productItem";
import Link from "next/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";

export interface IProductItem {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface IStoreProps {
  params: {};
  searchParams?: { page?: string; per_page?: string; title?: string };
}

async function Store({ searchParams }: IStoreProps) {
  const page = searchParams?.page ?? "1";
  const per_page = searchParams?.per_page ?? "5";
  const title = searchParams?.title ?? "";

  const result = await fetch(
    `http://json-server:3001/product?_page=${page}&_per_page=${per_page}&title=${title}`,
    { cache: "no-store" } // جلوگیری از کش شدن داده‌ها
  );

  if (!result.ok) {
    throw new Error("خطا در دریافت اطلاعات محصولات");
  }

  const data = (await result.json()) as IProductList;

  return (
    <Container>
      <p className="text-right py-4">خانه</p>
      <Search />
      <div className="grid grid-cols-4 gap-4">
        {data.data.map((item) => (
          <Link key={item.id} href={`/store/${item.id}`}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
      <Pagination pageCount={data.pages} />
    </Container>
  );
}

export default Store;

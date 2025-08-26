import Link from "next/link";
import Grid from "./Grid";
import CarouselWrapper from "./carouselwrapper";

async function getFlowers() {
    const res = await fetch("http://localhost:3001/flowers", {
      cache: "no-store", 
    });
    return res.json();
  }

export default async function FlowerSection() {
  const flowers = await getFlowers();
  return (
    <div className="w-full px-4">
      <h2 className="text-center text-lg font-semibold mb-4">کالکشن جدید</h2>

      {/* موبایل → کروسل */}
      <div className="block md:hidden">
        <CarouselWrapper flowers={flowers.slice(0, 5)} />
      </div>

      {/* دسکتاپ → گرید */}
      <div className="hidden md:block">
        <Grid flowers={flowers.slice(0, 6)} />
      </div>
      <div className="flex justify-center mt-6">
      <Link
          href="/flowers"
          className="px-4 py-2 bg-green text-black rounded-lg hover:bg-lightgreen2 transition"
        >
          مشاهده بیشتر
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import Grid from "./Grid";
import { getData } from "@/lib/getData";
import SharedCarousel from "../sharedCarousel";

export default async function FlowerSection() {
  const  {data:flowers}= await getData('flowers',1,100);

  return (
    <div className="w-full px-4">
      <h2 className="text-center text-lg font-semibold mb-4">کالکشن جدید</h2>

      {/* موبایل → کروسل */}
      <div className="block md:hidden">
        <SharedCarousel items={flowers.slice(0, 5)} />
      </div>

      {/* دسکتاپ → گرید */}
      <div className="hidden md:block">
        <Grid items={flowers.slice(0, 6)} />
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

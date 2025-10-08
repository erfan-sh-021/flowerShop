
import Link from "next/link";
import { getData } from "@/lib/getData";
import CarouselWrapper from "./carousel/carouselwrapper";

export default async function FlowerSection() {
  const { data: flowers } = await getData("flowers", 1, 100);

  return (
    <div className="w-full px-4">
      {/* کروسل برای همه سایزها */}
      <CarouselWrapper flowers={flowers.slice(0, 20)} />
    </div>
  );
}

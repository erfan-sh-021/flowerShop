import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/getData";
import { colorPalettes } from "@/utils/colorPlatte";

type Collection = {
  id: string;
  title: string;
  src: string;
  slug?: string;
};

export default async function CollectionsSection() {
  const res = await getData("collections", 1, 10);
  const collections: Collection[] = res?.data ?? [];
  const items = collections.slice(0, 6);
  const palette = colorPalettes[5]; // پالت دلخواه

  const placeholdersCount = 6 - items.length;

  return (
    <section className="w-full px-6  rounded-2xl">
      {/* متن بالا سمت راست */}
      {/* <div className="max-w-7xl mx-auto flex justify-end mb-4">
        <span
          className="text-sm font-semibold cursor-pointer hover:underline transition-colors"
          style={{ color: palette.linkHover }}
        >
          مشاهده همه
        </span>
      </div> */}

      {/* گرید کارت‌ها */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/collections/${item.slug ?? item.id}`}
            className="group relative block w-full pb-[100%] overflow-hidden rounded-lg focus:outline-none transition-shadow duration-300 hover:shadow-md"
            aria-label={`مشاهده دسته گل ${item.title}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-center p-2">
              <span
                className="text-center text-white text-sm md:text-base font-semibold px-3 py-1 rounded-md backdrop-blur-sm"
                style={{
                  background: `linear-gradient(90deg, ${palette.linkActive}AA, ${palette.linkHover}AA)`,
                }}
              >
                {item.title}
              </span>
            </div>
          </Link>
        ))}

        {/* کارت‌های placeholder */}
        {Array.from({ length: placeholdersCount }).map((_, idx) => (
          <div
            key={`placeholder-${idx}`}
            className="flex items-center justify-center w-full pb-[100%] border-2 border-dashed rounded-lg relative overflow-hidden cursor-pointer transition-colors duration-300 hover:border-linkHover hover:text-linkHover hover:scale-105 hover:shadow-lg"
            style={{
              borderColor: palette.linkActive,
              color: palette.linkActive,
              transitionProperty: "border-color, color, transform, box-shadow",
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-bold transition-transform duration-300 hover:scale-110">
              موارد بیشتر
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/getData";

type Collection = {
  id: string;
  title: string;
  src: string;
  slug?: string;
};

export default async function CollectionsSection() {
  const res = await getData("collections", 1, 10);
  const collections: Collection[] = res?.data ?? [];

  const items = collections.slice(0, 5);

  return (
    <section className="w-full px-6 rounded-2xl">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/collections/${item.slug ?? item.id}`}
            className="group relative block w-full pb-[100%] overflow-hidden rounded-lg 
                       focus:outline-none transition-shadow duration-300 hover:shadow-md"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* عنوان روی عکس */}
            <div className="absolute inset-0 flex items-end justify-center p-2">
              <span
                className="
               text-center text-white 
               text-xs sm:text-base md:text-md lg:text-lg 
               font-semibold 
               px-3 py-1 
               rounded-md backdrop-blur-xl shadow-lg
             "
                style={{
                  background: `linear-gradient(90deg, var(--button-from), var(--title-color))`,
                  opacity: 0.75, // شفاف‌تر
                }}
              >
                {item.title}
              </span>
            </div>
          </Link>
        ))}

        {/* Placeholder */}
        <div
          className="flex items-center justify-center w-full pb-[100%] 
                     border-2 border-dashed rounded-lg relative overflow-hidden cursor-pointer 
                     transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            borderColor: "var(--button-from)",
            color: "var(--button-from)",
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-bold">
            موارد بیشتر
          </span>
        </div>
      </div>
    </section>
  );
}

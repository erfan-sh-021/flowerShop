import Image from "next/image";

type Props = {
  items: { id: number; src?: string; alt?: string }[];
  cols?: number;
};

export default function Grid({ items, cols = 3 }: Props) {
  if (!items || !Array.isArray(items)) return null;

  // کلاس cols برای Tailwind را به شکل داینامیک کنترل کنیم
  const colsClass = `grid-cols-${cols}`;

  return (
    <div className={`grid ${colsClass} gap-6`}>
      {items
        .filter((item) => item && item.src && item.src.trim() !== "")
        .map((item) => (
          <Image
            key={item.id}
            src={item.src || "/images/placeholder.png"}
            alt={item.alt || "item"}
            width={300}
            height={300}
            className="rounded-lg object-cover mx-auto"
          />
        ))}
    </div>
  );
}

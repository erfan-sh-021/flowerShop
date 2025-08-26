import Image from "next/image";
type Props= {
    flowers : { id: number ; src?:string ; alt?: string}[];
};
export default function Grid({ flowers }: Props) {
    console.log(flowers)
  return (
    <div className="grid grid-cols-3 gap-6">
      {flowers
      .filter((flower)=>flower.src && flower.src.trim() !== "")
      .map((flower) => (
        <Image
          key={flower.id}
          src={flower.src || "/images/placeholder.png"}
          alt={flower.alt|| "flower"}
          width={300}
          height={300}
          className="rounded-lg object-cover mx-auto"
        />
      ))}
    </div>
  );
}

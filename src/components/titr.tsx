import Image from "next/image";

type RibbonTitleProps = {
  text: string;
  widthPercent?: string; // مثلا "90%" یا "100%"
};

export default function RibbonTitle({
  text,
  widthPercent = "90%",
}: RibbonTitleProps) {
  return (
    <div className="relative mx-auto text-center pt-10 pb-20">
      {/* تصویر روبان با عرض درصدی */}
      <div className="mx-auto" style={{ width: widthPercent }}>
        <Image
          src="/images/titrImg.png"
          alt="Ribbon"
          width={1920}
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* متن روی روبان */}
      <span
        className="  absolute inset-0 flex items-center justify-center
                     translate-y-0   /* موبایل */
                     sm:translate-y-3 /* ≥640px */
                     md:translate-y-[8%] /* ≥768px */
                     lg:translate-y-[10%] /* ≥1024px */
                     font-sans text-base sm:text-lg md:text-xl lg:text-3xl lg:font-bold "
      >
        {text}
      </span>
    </div>
  );
}

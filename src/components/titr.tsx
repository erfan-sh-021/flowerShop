type RibbonTitleProps = {
  text: string;
  widthPercent?: string; // مثلا "90%" یا "100%"
  lineColor?: string; // رنگ خط
  lineSpacing?: string; // فاصله بین خط‌ها
  pt?: string; // مقدار padding-top (tailwind class)
  pb?: string; // مقدار padding-bottom (tailwind class)
};

export default function RibbonTitle({
  text,
  widthPercent = "50%",
  lineColor = "#cfcfcf",
  lineSpacing = "10px",
  pt = "pt-20", // پیشفرض
  pb = "pb-20", // پیشفرض
}: RibbonTitleProps) {
  return (
    <div
      className={`relative mx-auto ${pt} ${pb}`}
      style={{ width: widthPercent, height: "150px" }}
    >
      <div className="flex items-center justify-center h-full">
        {/* خط چپ */}
        <div
          className="flex-1 border-t mt-5"
          style={{
            borderStyle: "dashed",
            borderColor: lineColor,
            borderWidth: "1px",
            borderSpacing: lineSpacing,
          }}
        ></div>

        {/* متن */}
        <span className="px-4 font-sans text-base sm:text-lg md:text-xl lg:text-3xl text-black text-center">
          {text}
        </span>

        {/* خط راست */}
        <div
          className="flex-1 border-t mt-5"
          style={{
            borderStyle: "dashed",
            borderColor: lineColor,
            borderWidth: "1px",
            borderSpacing: lineSpacing,
          }}
        ></div>
      </div>
    </div>
  );
}

type RibbonTitleProps = {
  text: string;
  widthPercent?: string; // مثلا "90%" یا "100%"
  lineColor?: string; // رنگ خط
  lineSpacing?: string; // فاصله بین خط‌ها
};

export default function RibbonTitle({
  text,
  widthPercent = "70%",
  lineColor = "#cfcfcf", 
  lineSpacing = "10px", // فاصله پیشفرض
}: RibbonTitleProps) {
  return (
    <div
      className="relative mx-auto py-40"
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

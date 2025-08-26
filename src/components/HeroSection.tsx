import Image from "next/image";

function HeroSection() {
  return (
    <section className="bg-[#f3cfc4] py-10 px-5 md:px-20 md:h-[35rem] ">
      <div className="flex flex-col md:flex-row items-center justify-around gap-8">
        {/* Text Content */}
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-xl md:text-3xl font-iran leading-relaxed">
            <div className="text-right">خاص ترین گل ها</div>
            <div className="text-center">برای</div>
            <div className="text-right">مراسم های شما</div>
          </h1>
          <button className="mt-6 bg-[#c8d5c2] px-6 py-2 rounded font-semibold hover:bg-[#b0c4aa] transition ">
            ادامه
          </button>
        </div>

        {/* Images */}
        <div className="relative flex  justify-center mt-0 sm:mt-20">
          {/* Center Image */}
          <Image
            src="/images/img2.png"
            alt="Main Flower"
            width={320}
            height={320}
            className="w-56 md:w-80 rounded shadow-lg"
          />

          {/* Top Right Image */}
          <Image
            src="/images/img1.png"
            alt="Red Roses"
            width={120}
            height={120}
            className="hidden md:block absolute -top-20 -right-12 w-20 md:w-28 rounded shadow-lg"
          />

          {/* Bottom Left Image */}
          <Image
            src="/images/img3.png"
            alt="Rose Bowl"
            width={120}
            height={120}
            className="hidden md:block absolute -bottom-20 -left-12 w-20 md:w-28 rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

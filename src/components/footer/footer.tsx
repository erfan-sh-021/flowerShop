import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import MobileAccordion from "./mobileAccordion";
import { colorPalettes } from "@/utils/colorPlatte";

interface FooterProps {
  palette: 1 | 2 | 3 | 4 | 5;
}

export default function Footer({ palette }: FooterProps) {
  const colors = colorPalettes[palette];

  return (
    <footer
      className="px-6 py-10 rtl mt-16 border-t"
      style={{ background: `linear-gradient(to right, ${colors.bgFrom}, ${colors.bgTo})`, color: colors.text }}
    >
      {/* دسکتاپ */}
      <div className="hidden md:grid grid-cols-4 gap-10 max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/images/FlowerLogo.png" alt="Flower Logo" className="w-15 h-12" />
            <span className="text-2xl font-semibold italic" style={{ color: colors.title }}>
              flower
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            {`گل فروشی گل نما، سفارش آنلاین انواع گل و گیاه آپارتمانی، دسته گل، باکس گل، تاج گل و ... تحویل فوری در شهر تهران`}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: colors.title }}>
            لینک های مفید
          </h3>
          <ul className="space-y-2 text-sm">
            {["بازار گل تهران","بازار گل محلاتی","بازار گل امام رضا","ایمیل فروشی","زیبار"].map((item, i) => (
              <li
                key={i}
                className="cursor-pointer transition hover:scale-105 hover:text-[color:var(--linkHover)]"
                style={{ color: colors.text, "--linkHover": colors.linkHover } as React.CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: colors.title }}>
            ماژول های کاربردی
          </h3>
          <ul className="space-y-2 text-sm">
            {["سفارش تاج گل","سفارش دسته گل","سفارش سبد گل","سفارش گل خانگی","پرسه‌مدی مدالوا"].map((item, i) => (
              <li
                key={i}
                className="cursor-pointer transition hover:scale-105 hover:text-[color:var(--linkHover)]"
                style={{ color: colors.text, "--linkHover": colors.linkHover } as React.CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: colors.title }}>
            شبکه های اجتماعی
          </h3>
          <div className="flex gap-3">
            {[Instagram, Send, Facebook, Youtube].map((Icon, i) => (
              <a key={i} className="shadow rounded-full p-2 transition hover:scale-110" style={{ backgroundColor: colors.buttonFrom }}>
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* موبایل */}
      <div className="md:hidden">
        <MobileAccordion key={palette} palette={palette} />
      </div>

      {/* کپی رایت */}
      <div className="mt-10 pt-4 flex flex-col md:flex-row justify-center gap-4 text-xs text-center border-t" style={{ borderColor: colors.text, color: colors.text }}>
        <span>Privacy Policy</span>
        <span>Copy Right</span>
        <span>Terms & Conditions</span>
        <span>Cookies Policy</span>
      </div>
    </footer>
  );
}

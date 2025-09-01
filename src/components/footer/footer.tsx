import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import MobileAccordion from "./mobileAccordion";

export default function Footer() {
  return (
    <footer className="bg-[#eec6b4] text-gray-800 px-6 py-8 rtl">
      {/* دسکتاپ */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {/* لوگو + توضیحات */}
        <div>
          <div className="flex items-center gap-2 mb-4 ">
            <img
              src="/images/FlowerLogo.png"
              alt="Flower Logo"
              className="w-15 h-12"
            />
            <span className="text-2xl font-semibold italic text-white">
              flower
            </span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">
            گل فروشی گل نما، سفارش آنلاین انواع گل و گیاه آپارتمانی، دسته گل،
            باکس گل، تاج گل و ... <br />
            تحویل فوری در شهر تهران
          </p>
        </div>

        {/* لینک های مفید */}
        <div>
          <h3 className="font-semibold text-sm  mb-3 ">لینک های مفید</h3>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>بازارهای گل تهران</li>
            <li>بازار گل محلاتی</li>
            <li>بازار گل امام رضا</li>
            <li>ایمیل فروشی</li>
            <li>زیبار</li>
          </ul>
        </div>

        {/* ماژول های کاربردی */}
        <div>
          <h3 className="font-semibold text-sm mb-3">ماژول های کاربردی</h3>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>سفارش تاج گل</li>
            <li>سفارش دسته گل</li>
            <li>سفارش سبد گل</li>
            <li>سفارش گل خانگی</li>
            <li>پرسه‌مدی مدالوا</li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h3 className="font-semibold text-sm mb-3">شبکه های اجتماعی</h3>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex items-center gap-2 ">
              اینستاگرام
              <Instagram className="w-6 h-6 cursor-pointer text-red-500" />
            </li>
            <li className="flex  items-center gap-8">
              تلگرام
              <Send className="w-6 h-6 cursor-pointer text-blue-500" />
            </li>
            <li className="flex items-center gap-5">
              فیسبوک
              <Facebook className="w-6 h-6 cursor-pointer text-blue-700" />
            </li>
            <li className="flex items-center gap-6">
              یوتیوب
              <Youtube className="w-6 h-6 cursor-pointer text-red-600" />
            </li>
          </ul>
          <div className="flex gap-3 mt-3 text-gray-700"></div>
        </div>
      </div>

      <div className="md:hidden">
        <MobileAccordion />
      </div>

      {/* کپی رایت */}
      <div className=" border-t border-white mt-8 pt-4 flex flex-col md:flex-row justify-center gap-4 text-xs text-white text-center">
        <span>privacy policy</span>
        <span>copy right</span>
        <span>terms & conditions</span>
        <span>cookies policy</span>
      </div>
    </footer>
  );
}

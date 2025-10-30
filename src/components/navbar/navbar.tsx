"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "../container";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import CartDrawer from "./cartDrawer";
import useCartStore from "@/store/useCartStore";
import { colorPalettes } from "@/utils/colorPlatte";
import useColorStore from "@/store/useColorStore"; // ✅ اضافه شد
import ClientOnly from "../clientOnly";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ گرفتن رنگ فعال از Zustand
  const currentPalette = useColorStore((state) => state.currentPalette);
  const colors = colorPalettes[currentPalette];

  // Zustand برای سبد خرید
  const totalItems = useCartStore((state) => state.getTotalItems());
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  // کنترل اسکرول
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", title: "خانه" },
    { href: "/store", title: "ترند" },
    { href: "/flowerBox", title: "باکس گل" },
    { href: "/FlowerBouquet", title: "دسته گل" },
    { href: "/spetial", title: "بسته های ویژه مناسبتی" },
    { href: "/login", title: "ورود" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 font-sans ${
          isScrolled ? "shadow-2xl border-b" : "border-b border-transparent"
        }`}
        style={{
          backgroundColor: isScrolled
            ? `${colors.bgFrom}F2`
            : `${colors.bgFrom}B3`,
        }}
      >
        <Container>
          <div className="flex flex-row-reverse justify-between items-center py-3 px-4 md:px-8">
            {/* دکمه موبایل */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md transition"
              >
                {menuOpen ? (
                  <svg
                    className="w-7 h-7 animate-rotate"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* لینک‌ها - دسکتاپ */}
            <div className="hidden md:flex flex-row-reverse gap-8 font-medium">
              {navLinks.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className={`text-sm md:text-xs lg:text-sm transition-all duration-300 relative px-2 py-1 ${
                    pathname === nav.href
                      ? `font-semibold`
                      : `hover:scale-110`
                  }`}
                  style={{
                    color:
                      pathname === nav.href
                        ? colors.linkActive
                        : colors.text,
                  }}
                >
                  {nav.title}
                </Link>
              ))}
            </div>

            {/* ایکون‌ها */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition transform hover:scale-125 hover:shadow-lg"
                style={{ backgroundColor: colors.buttonFrom }}
              >
                <ShoppingCart
                  size={20}
                  className="text-white animate-bounce-slow"
                />
                {hasHydrated && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-white text-black rounded-full shadow animate-pulse-slow">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/");
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full transition transform hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: colors.bgTo }}
              >
                <User size={20} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* منوی موبایل */}
          {menuOpen && (
            <div className="flex flex-col items-center gap-5 mt-4 px-4 pb-6 md:hidden text-center animate-slideDown fade-in">
              {navLinks.map((nav, index) => (
                <div key={nav.href} className="w-full flex flex-col items-center">
                  <Link
                    href={nav.href}
                    className={`transition-all duration-200`}
                    style={{
                      color:
                        pathname === nav.href
                          ? colors.linkActive
                          : colors.text,
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {nav.title}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="w-[70%] border-b border-gray-300 mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </nav>

      {/* فاصله برای محتوای زیر نوبار */}
      <div className="h-[4rem]" />
      <ClientOnly>
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </ClientOnly>
    </>
  );
}

export default Navbar;

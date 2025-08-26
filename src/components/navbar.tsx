"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "./container";
import { useshopingCartContext } from "@/context/shopingCartContext";
import Cookies from "js-cookie";
import { useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartTotalQty } = useshopingCartContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", title: "خانه " },
    { href: "/store", title: "ترند" },
    { href: "/flowerBox", title: "باکس گل" },
    { href: "/FlowerBouquet", title: "دسته گل" },
    { href: "/spetial", title: "بسته های ویژه مناسبتی" },
    { href: "/login", title: "ورود" },
  ];

  return (
    <nav className="shadow p-4 bg-lightbrown2 text-sm">
      <Container>
        <div className="flex flex-row-reverse justify-between items-center">
          {/* دکمه منو موبایل */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <svg
                  className="w-7 h-7 text-gray-700"
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
                  className="w-7 h-7 text-gray-700"
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
          <div className="hidden md:flex flex-row-reverse">
            {navLinks.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className={`mr-6 ${
                  pathname === nav.href ? "text-sky-400" : ""
                }`}
              >
                {nav.title}
              </Link>
            ))}
          </div>

          {/* بخش سمت چپ */}
          <div className="left flex items-center gap-2">
            <span className="px-2 py-1 text-white bg-red-500 rounded-full">
              {cartTotalQty}
            </span>
            <Link href={"/cart"}>سبد خرید</Link>
            <button
              onClick={() => {
                Cookies.remove("token");
                router.push("/");
              }}
              className="ml-4 text-red-600"
            >
              خروج
            </button>
          </div>
        </div>

        {/* منوی موبایل - آبشاری */}
        {menuOpen && (
          <div className="flex flex-col items-end mt-2 md:hidden bg-white shadow-md rounded p-2">
            {navLinks.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className={`py-2 ${
                  pathname === nav.href ? "text-sky-400" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {nav.title}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;

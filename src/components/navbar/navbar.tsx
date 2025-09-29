"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "../container";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import CartDrawer from "./cartDrawer";
import useCartStore from "@/store/useCartStore";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(useCartStore.getState().getTotalItems());
    const unsubscribe = useCartStore.subscribe((state) => {
      setTotalItems(state.getTotalItems());
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { href: "/", title: "خانه " },
    { href: "/store", title: "ترند" },
    { href: "/flowerBox", title: "باکس گل" },
    { href: "/FlowerBouquet", title: "دسته گل" },
    { href: "/spetial", title: "بسته های ویژه مناسبتی" },
    { href: "/login", title: "ورود" },
  ];

  return (
    <>
      <nav className="shadow p-4 bg-lightOrange text-sm">
        <Container>
          <div className="flex flex-row-reverse justify-between items-center">
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
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

            <div className="flex items-center gap-4">
              <span className="px-2 py-1 text-white bg-red-500 rounded-full text-xs">
                {totalItems}
              </span>

              <button
                onClick={() => setCartOpen(true)}
                className="hover:text-gray-900"
              >
                <ShoppingCart size={22} />
              </button>

              <button
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/");
                }}
                className="hover:text-red-600"
              >
                <User size={22} />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;

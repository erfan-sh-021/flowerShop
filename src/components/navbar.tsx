"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "./container";
import Cookies from "js-cookie";
import { useState } from "react";
import { ShoppingCart, User, Trash2 } from "lucide-react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ داده تستی برای جایگزینی موقت
  const [cartItems, setCartItems] = useState<any[]>([
    { id: 1, name: "گل رز", price: 120000, image: "/test.jpg" },
    { id: 2, name: "گل لاله", price: 150000, image: "/test.jpg" },
  ]);
  const cartTotalQty = cartItems.length;

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const navLinks = [
    { href: "/", title: "خانه " },
    { href: "/store", title: "ترند" },
    { href: "/flowerBox", title: "باکس گل" },
    { href: "/FlowerBouquet", title: "دسته گل" },
    { href: "/spetial", title: "بسته های ویژه مناسبتی" },
    { href: "/login", title: "ورود" },
  ];

  const closeCart = () => {
    setClosing(true);
    setTimeout(() => {
      setCartOpen(false);
      setClosing(false);
    }, 300);
  };

  return (
    <>
      <nav className="shadow p-4 bg-lightbrown2 text-sm">
        <Container>
          <div className="flex flex-row-reverse justify-between items-center">
            {/* منو موبایل */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                )}
              </button>
            </div>

            {/* لینک‌ها دسکتاپ */}
            <div className="hidden md:flex flex-row-reverse">
              {navLinks.map((nav) => (
                <Link key={nav.href} href={nav.href}
                  className={`mr-6 ${pathname === nav.href ? "text-sky-400" : ""}`}>
                  {nav.title}
                </Link>
              ))}
            </div>

            {/* بخش سمت چپ */}
            <div className="flex items-center gap-4">
              <span className="px-2 py-1 text-white bg-red-500 rounded-full text-xs">
                {cartTotalQty}
              </span>

              <button onClick={() => setCartOpen(true)} className="hover:text-gray-900">
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

      {/* Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/40" onClick={closeCart} />
          <div className={`relative w-80 bg-white h-full shadow-xl p-4 flex flex-col
            ${closing ? "animate-slide-out" : "animate-slide-in"}`}>
            <h2 className="text-center font-bold text-lg mb-4">سبد خرید</h2>

            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">سبد خرید خالی است</p>
              ) : (
                cartItems.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between border-b py-3">
                    <img src={item.image} alt={item.name}
                      className="w-16 h-16 rounded object-cover"/>
                    <div className="flex-1 text-right mr-3">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.price} تومان</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <Link href="/checkout"
                className="bg-green-800 text-white text-center py-2 rounded mt-4"
                onClick={closeCart}>
                تکمیل خرید
              </Link>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease forwards;
        }
        .animate-slide-out {
          animation: slideOut 0.3s ease forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOut {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}

export default Navbar;

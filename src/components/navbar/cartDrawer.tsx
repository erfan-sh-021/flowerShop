"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { Trash2 } from "lucide-react";
import ClientOnly from "../clientOnly";

function CartDrawerContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (isOpen) setShowDrawer(true);
    else {
      const timeout = setTimeout(() => setShowDrawer(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showDrawer) return null;

  const handleCheckout = () => {
    onClose();
    setTimeout(() => router.push("/checkout"), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <div
        className={`relative w-80 bg-white h-full shadow-xl p-4 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-center font-bold text-lg mb-4 border-b border-gray-300 pb-2">
          سبد خرید
        </h2>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">سبد خرید خالی است</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1 text-right mr-3">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.price.toLocaleString()} تومان</p>
                  <div className="flex items-center gap-2 mt-1 ml-4 justify-between">
                    <div className="gap-2 flex items-center">
                      <button onClick={() => decreaseQty(item.id)} className="px-2 bg-gray-200 rounded hover:bg-green">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} className="px-1.5 bg-gray-200 rounded hover:bg-green">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-3">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-4">
            <p className="text-center font-bold border-y border-gray-300 py-3 mb-6">
              جمع کل: {getTotalPrice().toLocaleString()} تومان
            </p>
            <button
              onClick={handleCheckout}
              className="bg-darkgreen text-white text-center py-2 px-14 rounded block hover:bg-lightgreen transition mx-auto"
            >
              تکمیل خرید
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartDrawer(props: { isOpen: boolean; onClose: () => void }) {
  return (
    <ClientOnly>
      <CartDrawerContent {...props} />
    </ClientOnly>
  );
}

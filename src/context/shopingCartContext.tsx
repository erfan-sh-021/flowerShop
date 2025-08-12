"use client";
import CardItem from "@/components/cardItem";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

export const shopingCartContext = createContext({} as TShopingCartContext);
type shopingCartContextProviderProps = {
  children: React.ReactNode;
};
type CartItems = {
  id: number;
  qty: number;
};
type TShopingCartContext = {
  cartItems: CartItems[];
  handleIncreseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  cartTotalQty: number;
  handleDecreseProductQty: (id: number) => void;
  handleRemoveProduct: (id: number) => void;
};

export const useshopingCartContext = () => {
  return useContext(shopingCartContext);
};
function ShopingCartContextProvider({
  children,
}: shopingCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const cartTotalQty = cartItems.reduce((totalQty, item) => {
    return totalQty + item.qty;
  }, 0);

  const getProductQty = (id: number) => {
    return cartItems.find((item) => item.id == id)?.qty || 0;
  };
  const handleIncreseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      let isNotProductExist =
        currentItems.find((item) => item.id == id) == null;
      if (isNotProductExist) {
        return [...currentItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecreseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      let isLastOne = currentItems.find((item) => item.id == id)?.qty == 1;
      if (isLastOne) {
        return currentItems.filter((item) => item.id != id);
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleRemoveProduct = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id != id);
    });
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <shopingCartContext.Provider
      value={{
        cartItems,
        handleIncreseProductQty,
        getProductQty,
        cartTotalQty,
        handleDecreseProductQty,
        handleRemoveProduct,
      }}
    >
      {children}
    </shopingCartContext.Provider>
  );
}

export default ShopingCartContextProvider;

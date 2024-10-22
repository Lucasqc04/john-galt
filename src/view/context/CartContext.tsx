import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category_id: string;
};

type CartContextType = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const add = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  };

  const remove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clear = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        add,
        clear,
        remove,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

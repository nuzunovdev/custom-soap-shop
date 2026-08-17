import type { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "custom-soap-shop-cart";

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const cartJson = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!cartJson) {
    return [];
  }

  try {
    return JSON.parse(cartJson) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function addCartItem(newItem: CartItem) {
  const currentItems = getCartItems();
  const existingItem = currentItems.find((item) => item.id === newItem.id);

  if (existingItem) {
    const updatedItems = currentItems.map((item) =>
      item.id === newItem.id
        ? { ...item, quantity: item.quantity + newItem.quantity }
        : item,
    );

    saveCartItems(updatedItems);
    return;
  }

  saveCartItems([...currentItems, newItem]);
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const currentItems = getCartItems();

  if (quantity <= 0) {
    saveCartItems(currentItems.filter((item) => item.id !== itemId));
    return;
  }

  const updatedItems = currentItems.map((item) =>
    item.id === itemId ? { ...item, quantity } : item,
  );

  saveCartItems(updatedItems);
}

export function removeCartItem(itemId: string) {
  const currentItems = getCartItems();
  saveCartItems(currentItems.filter((item) => item.id !== itemId));
}

export function clearCart() {
  saveCartItems([]);
}

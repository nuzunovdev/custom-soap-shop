"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  clearCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart";
import { createOrder } from "@/lib/orders";
import type { CartItem } from "@/types/cart";
import type { CreateOrderRequest } from "@/types/order";

export function CartPageContent() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  function refreshCart() {
    setItems(getCartItems());
  }

  function handleQuantityChange(itemId: string, quantity: number) {
    updateCartItemQuantity(itemId, quantity);
    refreshCart();
  }

  function handleRemove(itemId: string) {
    removeCartItem(itemId);
    refreshCart();
  }

  function handleClearCart() {
    clearCart();
    setItems([]);
  }

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Cart is empty.");
      return;
    }

    const orderRequest: CreateOrderRequest = {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items: items.map((item) => {
        if (item.type === "READY") {
          if (!item.soapId) {
            throw new Error("Ready soap item is missing soapId.");
          }

          return {
            type: "READY",
            soapId: item.soapId,
            quantity: item.quantity,
          };
        }

        return {
          type: "CUSTOM",
          soapVariationId: item.soapVariation.id,
          soapFragranceIds: item.fragrances.map((fragrance) => fragrance.id),
          initials: item.initials,
          quantity: item.quantity,
        };
      }),
    };

    try {
      setIsSubmitting(true);

      const order = await createOrder(orderRequest);

      clearCart();
      setItems([]);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setCustomerAddress("");

      const message = `Order #${order.id} created successfully. Total: ${Number(
        order.totalPrice,
      ).toFixed(2)} лв.`;

      setSuccessMessage(message);
      toast.success(`Order #${order.id} created successfully`, {
        description: `Total: ${Number(order.totalPrice).toFixed(2)} лв.`,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the order.";

      setErrorMessage(message);
      toast.error("Failed to create order", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight">Your cart</h1>

        {successMessage && (
          <div className="mt-6 rounded-2xl border border-[#DDE7D0] bg-[#F1F6EA] p-4 text-sm font-medium text-[#4F6141]">
            {successMessage}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-[#E7D8C4] bg-[#FFFDF8] p-8">
          <p className="text-[#7A6655]">Your cart is empty.</p>

          <a
            href="/#ready-soaps"
            className="mt-6 inline-flex rounded-full bg-[#5B3A29] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3F281D]"
          >
            View ready soaps
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7A6655]">
            Checkout preview
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Your cart
          </h1>
        </div>

        <button
          onClick={handleClearCart}
          className="rounded-full border border-[#D6C3AA] px-5 py-2 text-sm font-semibold transition hover:bg-[#F1E4D2]"
        >
          Clear cart
        </button>
      </div>

      {errorMessage && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-[#E7D8C4] bg-[#FFFDF8] p-5 shadow-sm"
            >
              <div className="grid gap-5 md:grid-cols-[140px_1fr_auto]">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-36 w-full rounded-2xl object-cover md:w-[140px]"
                  />
                ) : (
                  <div className="flex h-36 items-center justify-center rounded-2xl bg-[#EFE2D1] text-sm text-[#8A6F5A] md:w-[140px]">
                    Soap image
                  </div>
                )}

                <div>
                  <div
                    className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      item.type === "READY"
                        ? "bg-[#E8DCC3] text-[#5B3A29]"
                        : "bg-[#DDE7D0] text-[#4F6141]"
                    }`}
                  >
                    {item.type === "READY" ? "Ready soap" : "Custom soap"}
                  </div>

                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="mt-2 text-sm text-[#7A6655]">
                    Type: {item.soapVariation.name}
                  </p>

                  <p className="text-sm text-[#7A6655]">
                    Aromas:{" "}
                    {item.fragrances.length > 0
                      ? item.fragrances
                          .map((fragrance) => fragrance.name)
                          .join(" + ")
                      : "None"}
                  </p>

                  <p className="text-sm text-[#7A6655]">
                    Initials: {item.initials || "None"}
                  </p>

                  <p className="mt-3 font-semibold">
                    {item.unitPrice.toFixed(2)} лв.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <div className="flex items-center rounded-full border border-[#D6C3AA]">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-4 py-2 text-lg"
                    >
                      -
                    </button>

                    <span className="min-w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-4 py-2 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-[#E7D8C4] bg-[#FFFDF8] p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Checkout</h2>

          <div className="mt-5 space-y-3 text-sm text-[#7A6655]">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} лв.</span>
            </div>

            <div className="border-t border-[#E7D8C4] pt-3">
              <div className="flex justify-between text-base font-bold text-[#2F261F]">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} лв.</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#5B3A29]"
                placeholder="Nikolay Uzunov"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#5B3A29]"
                placeholder="nikolay@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Phone</label>
              <input
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#5B3A29]"
                placeholder="0888123456"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Address</label>
              <input
                value={customerAddress}
                onChange={(event) => setCustomerAddress(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#5B3A29]"
                placeholder="Varna, str.Yavor, entr.A, fl.4, ap.40"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#5B3A29] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3F281D] disabled:cursor-not-allowed disabled:bg-[#D6C3AA]"
            >
              {isSubmitting ? "Creating order..." : "Create order"}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}

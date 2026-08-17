"use client";

import { toast } from "sonner";
import { addCartItem } from "@/lib/cart";
import type { Soap } from "@/types/catalog";

type AddToCartButtonProps = {
  soap: Soap;
};

export function AddToCartButton({ soap }: AddToCartButtonProps) {
  function handleAddToCart() {
    addCartItem({
      id: `ready-${soap.id}`,
      type: "READY",
      soapId: soap.id,
      name: soap.name,
      description: soap.description,
      soapVariation: soap.soapVariation,
      fragrances: soap.fragrances,
      initials: soap.initials,
      unitPrice: Number(soap.price),
      quantity: 1,
      imageUrl: soap.imageUrl,
    });

    toast.success(`${soap.name} added to cart`, {
      description: "You can review it in your cart.",
      action: {
        label: "View cart",
        onClick: () => {
          window.location.href = "/cart";
        },
      },
    });
  }

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-full bg-[#5B3A29] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3F281D]"
    >
      Add to cart
    </button>
  );
}

import type { SoapFragrance, SoapVariation } from "@/types/catalog";

export type CartItemType = "READY" | "CUSTOM";

export type CartItem = {
  id: string;
  type: CartItemType;
  soapId?: number;
  name: string;
  description: string | null;
  soapVariation: SoapVariation;
  fragrances: SoapFragrance[];
  initials: string | null;
  unitPrice: number;
  quantity: number;
  imageUrl: string | null;
};

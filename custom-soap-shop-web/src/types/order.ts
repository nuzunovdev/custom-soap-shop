export type CreateOrderItemRequest =
  | {
      type: "READY";
      soapId: number;
      quantity: number;
    }
  | {
      type: "CUSTOM";
      soapVariationId: number;
      soapFragranceIds: number[];
      initials: string | null;
      quantity: number;
    };

export type CreateOrderRequest = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CreateOrderItemRequest[];
};

export type OrderResponse = {
  id: number;
  status: string;
  totalPrice: number;
};

package com.mverse.customsoapshop.dto.order;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private List<CreateOrderItemRequest> items;
}

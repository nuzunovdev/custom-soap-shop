package com.mverse.customsoapshop.dto.order;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderItemRequest {
    private OrderItemType type;
    private Long soapId;
    private Long soapVariationId;
    private List<Long> soapFragranceIds;
    private String initials;
    private Integer quantity;
}

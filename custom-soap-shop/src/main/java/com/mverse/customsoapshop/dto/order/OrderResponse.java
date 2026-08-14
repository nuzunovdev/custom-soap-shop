package com.mverse.customsoapshop.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String status;
    private BigDecimal totalPrice;
}

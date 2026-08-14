package com.mverse.customsoapshop.controller.order;

import com.mverse.customsoapshop.dto.order.CreateOrderRequest;
import com.mverse.customsoapshop.dto.order.OrderResponse;
import com.mverse.customsoapshop.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@RequestBody CreateOrderRequest request) {
        return orderService.createOrder(request);
    }
}

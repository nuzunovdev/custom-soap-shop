package com.mverse.customsoapshop.service.order;

import com.mverse.customsoapshop.dto.order.CreateOrderItemRequest;
import com.mverse.customsoapshop.dto.order.CreateOrderRequest;
import com.mverse.customsoapshop.dto.order.OrderItemType;
import com.mverse.customsoapshop.dto.order.OrderResponse;
import com.mverse.customsoapshop.entity.order.Order;
import com.mverse.customsoapshop.entity.order.OrderItem;
import com.mverse.customsoapshop.entity.soap.Soap;
import com.mverse.customsoapshop.repository.order.OrderRepository;
import com.mverse.customsoapshop.service.soap.SoapService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final SoapService soapService;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item.");
        }

        Order order = Order.builder()
          .customerName(request.getCustomerName())
          .customerEmail(request.getCustomerEmail())
          .customerPhone(request.getCustomerPhone())
          .customerAddress(request.getCustomerAddress())
          .items(new ArrayList<>())
          .status("NEW")
          .build();

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CreateOrderItemRequest itemRequest : request.getItems()) {
            int quantity = itemRequest.getQuantity() == null ? 1 : itemRequest.getQuantity();

            if (quantity <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than zero.");
            }

            Soap soap;

            if (itemRequest.getType().equals(OrderItemType.READY)) {
                soap = soapService.getReadySoap(itemRequest.getSoapId());
            } else if (itemRequest.getType().equals(OrderItemType.CUSTOM)) {
                soap = soapService.createCustomSoap(itemRequest);
            } else {
                throw new IllegalArgumentException("Invalid order item type.");
            }

            OrderItem orderItem = OrderItem.builder()
              .soap(soap)
              .quantity(quantity)
              .unitPrice(soap.getPrice())
              .build();

            order.addItem(orderItem);

            totalPrice = totalPrice.add(soap.getPrice().multiply(BigDecimal.valueOf(quantity)));
        }

        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        return OrderResponse.builder()
          .id(savedOrder.getId())
          .status(savedOrder.getStatus())
          .totalPrice(savedOrder.getTotalPrice())
          .build();
    }
}

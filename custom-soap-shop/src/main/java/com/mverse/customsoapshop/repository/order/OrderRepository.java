package com.mverse.customsoapshop.repository.order;

import com.mverse.customsoapshop.entity.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
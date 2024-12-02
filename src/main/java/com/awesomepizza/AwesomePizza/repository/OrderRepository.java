package com.awesomepizza.AwesomePizza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.awesomepizza.AwesomePizza.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(Integer status);
}

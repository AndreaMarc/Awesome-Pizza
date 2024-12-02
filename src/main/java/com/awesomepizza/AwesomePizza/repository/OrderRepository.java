package com.awesomepizza.AwesomePizza.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.awesomepizza.AwesomePizza.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {}

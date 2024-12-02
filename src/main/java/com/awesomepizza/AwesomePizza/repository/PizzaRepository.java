package com.awesomepizza.AwesomePizza.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.awesomepizza.AwesomePizza.entity.Pizza;

public interface PizzaRepository extends JpaRepository<Pizza, Long> {}


package com.awesomepizza.AwesomePizza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.awesomepizza.AwesomePizza.entity.Order;
import com.awesomepizza.AwesomePizza.entity.Pizza;
import com.awesomepizza.AwesomePizza.repository.OrderRepository;
import com.awesomepizza.AwesomePizza.repository.PizzaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PizzaRepository pizzaRepository;

    // GET - Recupera tutti gli ordini
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // POST - Crea un nuovo ordine
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // Facciamo il salvataggio automatico di ogni pizza
        order.setPizzas(pizzaRepository.findAllById(
            order.getPizzas().stream().map(Pizza::getId).toList()
        ));
        return orderRepository.save(order);
    }

    // PUT - Aggiorna un ordine
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Order order = orderRepository.findById(id).orElseThrow();

        order.setStatus(orderDetails.getStatus());
        order.setNickname(orderDetails.getNickname());
        order.setPizzas(pizzaRepository.findAllById(
            orderDetails.getPizzas().stream().map(Pizza::getId).toList()
        ));

        return orderRepository.save(order);
    }

    // DELETE - Cancella un ordine
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return "Order deleted with ID: " + id;
    }
}


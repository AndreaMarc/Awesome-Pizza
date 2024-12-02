package com.awesomepizza.AwesomePizza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.awesomepizza.AwesomePizza.entity.Pizza;
import com.awesomepizza.AwesomePizza.repository.PizzaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/pizzas")
public class PizzaController {

    @Autowired
    private PizzaRepository pizzaRepository;

    // GET - Recupera tutte le pizze
    @GetMapping
    public List<Pizza> getAllPizzas() {
        return pizzaRepository.findAll();
    }

    // POST - Crea una nuova pizza
    @PostMapping
    public Pizza createPizza(@RequestBody Pizza pizza) {
        return pizzaRepository.save(pizza);
    }

    // PUT - Aggiorna una pizza
    @PutMapping("/{id}")
    public Pizza updatePizza(@PathVariable Long id, @RequestBody Pizza pizzaDetails) {
        Pizza pizza = pizzaRepository.findById(id).orElseThrow();
        pizza.setDescription(pizzaDetails.getDescription());
        return pizzaRepository.save(pizza);
    }

    // DELETE - Cancella una pizza
    @DeleteMapping("/{id}")
    public String deletePizza(@PathVariable Long id) {
        pizzaRepository.deleteById(id);
        return "Pizza deleted with ID: " + id;
    }
}


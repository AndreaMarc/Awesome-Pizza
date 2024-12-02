package com.awesomepizza.AwesomePizza.model;

import java.util.List;

public class OrderModel {
    private String nickname;
    private Integer status;
    private List<Long> pizzas;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Long> getPizzas() {
        return pizzas;
    }

    public void setPizzas(List<Long> pizzas) {
        this.pizzas = pizzas;
    }
}


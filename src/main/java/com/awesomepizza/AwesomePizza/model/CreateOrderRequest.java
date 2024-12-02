package com.awesomepizza.AwesomePizza.model;

import java.util.List;

public class CreateOrderRequest {

    private Integer status;
    private String nickname;
    private List<Long> pizzaIds;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public List<Long> getPizzaIds() {
        return pizzaIds;
    }

    public void setPizzaIds(List<Long> pizzaIds) {
        this.pizzaIds = pizzaIds;
    }
}


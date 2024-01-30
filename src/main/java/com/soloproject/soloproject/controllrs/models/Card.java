package com.soloproject.soloproject.controllrs.models;

import javax.persistence.Entity;

@Entity
public class Card extends AbstractEntity{

    private String name;

    private String type;


    public Card() {
    }

    public Card(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

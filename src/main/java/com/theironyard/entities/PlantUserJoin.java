package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Created by jonathandavidblack on 7/4/16.
 */
//created with help from alex hughes' sherpa project
@Entity
@Table(name = "plant_user_join")
public class PlantUserJoin {
    @Id
    @GeneratedValue
    private int id;

    public LocalDateTime lastWateredOn;

    @JsonIgnore
    @ManyToOne(cascade = javax.persistence.CascadeType.REMOVE)
    private  User user;


    @ManyToOne
    public Plant plant;

    public PlantUserJoin(User user, Plant plant) {
        this.user = user;
        this.plant = plant;
    }

    public PlantUserJoin() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getLastWateredOn() {
        return lastWateredOn;
    }

    public void setLastWateredOn(LocalDateTime lastWateredOn) {
        this.lastWateredOn = lastWateredOn;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }
}

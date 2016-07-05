package com.theironyard.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by jonathandavidblack on 7/1/16.
 */
@Entity
@Table(name = "plants")
public class Plant {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String plantName;

    @Column(nullable = false)
    String species;

    @Column
    LocalDateTime lastWateredOn;

    @Column(nullable = false)
    int wateringInterval;

    @Column
    LocalDateTime nextWateringDate;

    @ManyToOne
    User gardener;

    public Plant() {
    }

    public Plant(String plantName, String species, LocalDateTime lastWateredOn, int wateringInterval, LocalDateTime nextWateringDate, User gardener) {
        this.plantName = plantName;
        this.species = species;
        this.lastWateredOn = lastWateredOn;
        this.wateringInterval = wateringInterval;
        this.nextWateringDate = nextWateringDate;
        this.gardener = gardener;
    }

    public Plant(int id, String plantName, String species, LocalDateTime lastWateredOn, int wateringInterval) {
        this.id = id;
        this.plantName = plantName;
        this.species = species;
        this.lastWateredOn = lastWateredOn;
        this.wateringInterval = wateringInterval;
    }

    public Plant(int id, String plantName, String species, LocalDateTime lastWateredOn, int wateringInterval, LocalDateTime nextWateringDate, User gardener) {
        this.id = id;
        this.plantName = plantName;
        this.species = species;
        this.lastWateredOn = lastWateredOn;
        this.wateringInterval = wateringInterval;
        this.nextWateringDate = nextWateringDate;
        this.gardener = gardener;
    }


    public Plant(int id, String plantName, String species, LocalDateTime lastWateredOn, int wateringInterval, LocalDateTime nextWateringDate) {
        this.id = id;
        this.plantName = plantName;
        this.species = species;
        this.lastWateredOn = lastWateredOn;
        this.wateringInterval = wateringInterval;
        this.nextWateringDate = nextWateringDate;
    }

    public Plant(String plantName, String species, LocalDateTime lastWateredOn, int wateringInterval, LocalDateTime nextWateringDate) {
        this.plantName = plantName;
        this.species = species;
        this.lastWateredOn = lastWateredOn;
        this.wateringInterval = wateringInterval;
        this.nextWateringDate = nextWateringDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public LocalDateTime getLastWateredOn() {
        return lastWateredOn;
    }

    public void setLastWateredOn(LocalDateTime lastWateredOn) {
        this.lastWateredOn = lastWateredOn;
    }

    public int getWateringInterval() {
        return wateringInterval;
    }

    public void setWateringInterval(int wateringInterval) {
        this.wateringInterval = wateringInterval;
    }

    public LocalDateTime getNextWateringDate() {
        return nextWateringDate;
    }

    public void setNextWateringDate(LocalDateTime nextWateringDate) {
        this.nextWateringDate = nextWateringDate;
    }
    public User getGardener() {
        return gardener;
    }

    public void setGardener(User gardener) {
        this.gardener = gardener;
    }

}

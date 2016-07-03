package com.theironyard.entities;

import javax.persistence.*;
import java.util.List;

/**
 * Created by jonathandavidblack on 7/1/16.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_plants",joinColumns={@JoinColumn(name="users_id")}, inverseJoinColumns={@JoinColumn(name="plants_id")})
    public List<Plant> plantListByUser;

    public User() {
    }

    public User(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public List<Plant> getPlantListByUser() {
        return plantListByUser;
    }

    public void setPlantListByUser(List<Plant> plantListByUser) {
        this.plantListByUser = plantListByUser;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

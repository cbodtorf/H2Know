package com.theironyard.controllers;

import com.theironyard.entities.Plant;
import com.theironyard.entities.User;
import com.theironyard.services.PlantRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by jonathandavidblack on 7/1/16.
 */
@RestController
public class H2KnowRestController {

    @Autowired
    UserRepository users;

    @Autowired
    PlantRepository plants;

    //created with help from example in Alex's Sherpa project
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login(@RequestBody User user, HttpSession session) throws Exception {
        User userFromDatabase = users.findFirstByUsername(user.getUsername());
        if (userFromDatabase == null) {
            user.setPassword(PasswordStorage.createHash(user.getPassword()));
            user.setUsername(user.getUsername());
            users.save(user);
        }
        else if (!PasswordStorage.verifyPassword(user.getPassword(), userFromDatabase.getPassword())) {
            throw new Exception("BAD PASS");
        }
        session.setAttribute("username", user.getUsername());
        return user;
    }

    @RequestMapping(path = "/manager", method = RequestMethod.GET)
    public Iterable<Plant> listOfAllPlants (HttpSession session, Integer id) throws Exception {
        String username = (String) session.getAttribute("username");
        User user = users.findFirstByUsername(username);

        if (username == null) {
            throw new Exception("You Must be logged in to see this page");
        }
        return plants.findAll();
    }
    @RequestMapping(path = "/manger", method = RequestMethod.POST)
    public User addPlant(HttpSession session, Integer id) throws Exception {

        String username = (String) session.getAttribute("username");
        User user = users.findFirstByUsername(username);

        if (username == null) {
            throw new Exception("You Must be logged in to see this page");
        }

        Plant plantToAdd = plants.findOne(id);
        user.getPlantListByUser().add(plantToAdd);
        users.save(user);

        return user;
    }
}

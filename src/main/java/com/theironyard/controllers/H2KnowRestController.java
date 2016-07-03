package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.services.PlantRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

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
            throw new Exception("Wrong Password!");
        }
        session.setAttribute("username", user.getUsername());
        return user;
    }
    @RequestMapping(path = "/#manager", method = RequestMethod.GET)
    public String home(HttpSession session, Integer id) throws Exception {
        plants.findAll();
        String username = (String) session.getAttribute("username");
        if (username == null) {
            throw new Exception("You Must be logged in to see this page");
        }
        User loggedInUser = users.findOne(id);
        loggedInUser.getPlantListByUser();
        if (loggedInUser.plantListByUser.isEmpty()) {
            return"Please Add a plant";
        } else {
            return "";
        }
    }

}

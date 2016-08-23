package com.theironyard.controllers;

import com.theironyard.entities.Plant;
import com.theironyard.entities.PlantUserJoin;
import com.theironyard.entities.User;
import com.theironyard.services.PlantRepository;
import com.theironyard.services.PlantUserJoinRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Autowired
    PlantUserJoinRepository pujr;

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
    public Iterable<Plant> listOfAllPlants (HttpSession session) throws Exception {
        String username = (String) session.getAttribute("username");

        if (username == null) {
            throw new Exception("You Must be logged in to see this page");
        }
        return plants.findAll();
    }

    //hit this route when adding a plant to a users plant list
    //creating a plantUserJoin object from the logged in user and the received plant's id
    @RequestMapping(path = "/manager", method = RequestMethod.POST)
    public User addPlant(HttpSession session, @RequestBody Plant plant) throws Exception {

        String username = (String) session.getAttribute("username");
        User user = users.findFirstByUsername(username);
        plant.setGardener(user);
        plant.setLastWateredOn(LocalDateTime.now());
        plant.setNextWateringDate(LocalDateTime.now().plusDays(plant.getWateringInterval()));
        Plant plantToAdd = plants.findOne(plant.getId());

        if (username == null) {
            throw new Exception("You Must be logged in to see this page");
        }
        List<PlantUserJoin> plantListThatWasAddedTo = user.getPlantListByUser();
        PlantUserJoin join = pujr.findByUserAndPlant(user, plant);
        if (plantListThatWasAddedTo.contains(join)) {
            return user;
        }
        else {

            PlantUserJoin plantJoin = new PlantUserJoin(user, plantToAdd);

//            if (!plantListThatWasAddedTo.contains(plantJoin)) {
                plantListThatWasAddedTo.add(plantJoin);
//            }

            users.save(user);

            return user;
        }
    }

    @RequestMapping(path = "/manager/userPlantList", method = RequestMethod.GET)
    public List<Plant> listOfUsersPlants(HttpSession session) {
        String username = (String) session.getAttribute("username");
        User user = users.findFirstByUsername(username);
        List<PlantUserJoin> userPlantJoinList = user.getPlantListByUser();
        List<Plant> userPlantList = new ArrayList<>();

        for (PlantUserJoin puj : userPlantJoinList) {
            if (puj.getUser() == user) {
                userPlantList.add(puj.getPlant());
            }
        }
        users.save(user);
        return userPlantList;
    }

    @RequestMapping(path = "/manager/userPlantList/{id}", method = RequestMethod.DELETE)
    public HttpStatus listOfPlantsThatWerentDeleted(HttpSession session, @PathVariable("id") int id) {
        String username = (String) session.getAttribute("username");

        User user = users.findFirstByUsername(username);
        Plant plant = plants.findOne(id);
        PlantUserJoin puj = pujr.findByUserAndPlant(user, plant);
        List<PlantUserJoin> userPlantJoinList = user.getPlantListByUser();

        userPlantJoinList.remove(puj);
        pujr.delete(puj);
        users.save(user);
        return HttpStatus.OK;
    }

    @RequestMapping(path = "/manager/userPlantList{id}", method = RequestMethod.PUT)
    public Iterable<PlantUserJoin> listOfPlantsToBeWatered(HttpSession session,  @PathVariable("id") int id) {

        String username = (String) session.getAttribute("username");
        User user = users.findFirstByUsername(username);

        Plant plant = plants.findOne(id);
        PlantUserJoin plantToBeUpdated = pujr.findByUserAndPlant(user, plant);

        plantToBeUpdated.getPlant().setLastWateredOn(LocalDateTime.now());
        plantToBeUpdated.getPlant().setNextWateringDate(LocalDateTime.now().plusDays(plantToBeUpdated.getPlant().getWateringInterval()));



        List<PlantUserJoin> userPlantList = user.getPlantListByUser();

        pujr.save(plantToBeUpdated);
        users.save(user);

        return userPlantList;
    }
    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public HttpStatus logout(HttpSession session) {
        session.invalidate();
        return HttpStatus.I_AM_A_TEAPOT; //?
    }

}

package com.theironyard.controllers;

import com.theironyard.entities.Plant;
import com.theironyard.entities.PlantUserJoin;
import com.theironyard.entities.User;
import com.theironyard.services.PlantRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Created by jonathandavidblack on 7/1/16.
 */
@Controller
public class H2KnowController {

    @Autowired
    UserRepository users;

    @Autowired
    PlantRepository plants;


    @PostConstruct
    public void init() throws SQLException, FileNotFoundException {
        Server.createWebServer().start();
        if (plants.count() == 0) {
            parsePlants("plantList.csv");
        }

    }

    public void parsePlants(String fileName) throws FileNotFoundException {
        if (plants.count() == 0) {
            File plantFile = new File(fileName);
            Scanner fileScanner = new Scanner(plantFile);
            fileScanner.nextLine();
            while (fileScanner.hasNext()) {
                String[] columns = fileScanner.nextLine().split(",");
                Plant plant = new Plant(columns[0], columns[1], LocalDateTime.now(), Integer.valueOf(columns[2]));
                plants.save(plant);

            }
        }
    }
}


        //List<Plant> userPlantList = plants.findAllByUser(users.findOne(user.id));
//        if (userPlantList.size() > 0) {
//            return new ResponseEntity<Object>(userPlantList, HttpStatus.ACCEPTED);
//        }




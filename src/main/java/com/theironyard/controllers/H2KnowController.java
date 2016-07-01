package com.theironyard.controllers;

import com.theironyard.entities.Plant;
import com.theironyard.entities.User;
import com.theironyard.services.PlantRepository;
import com.theironyard.services.UserRepository;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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

    }

    public void parsePlants(String fileName) throws FileNotFoundException {
        ArrayList<Plant> plantList = new ArrayList<>();
        if (plants.count() == 0) {
            File plantFile = new File(fileName);
            Scanner fileScanner = new Scanner(plantFile);
            fileScanner.nextLine();
            while (fileScanner.hasNext()) {
                String[] columns = fileScanner.nextLine().split(",");
                Plant plant = new Plant(Integer.valueOf(columns[0]), columns[1], columns[2], Integer.valueOf(columns[4]));
                plants.save(plant);

            }
        }
    }
}

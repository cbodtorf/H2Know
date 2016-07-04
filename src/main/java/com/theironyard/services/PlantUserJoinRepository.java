package com.theironyard.services;

import com.theironyard.entities.Plant;
import com.theironyard.entities.PlantUserJoin;
import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by jonathandavidblack on 7/4/16.
 */
public interface PlantUserJoinRepository extends CrudRepository<PlantUserJoin, Integer> {
    PlantUserJoin findByUserAndPlant(User user, Plant plant);

}

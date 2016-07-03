package com.theironyard.services;

import com.theironyard.entities.Plant;
import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by jonathandavidblack on 7/1/16.
 */
public interface PlantRepository extends CrudRepository<Plant, Integer> {
    public Iterable<Plant> findByUser(User user);
    public Plant findOneByGardener(User gardener);
}

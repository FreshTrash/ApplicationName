package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.home.model.Equipment;

import java.util.List;

/**
 * Created by Maksim on 03.06.2016.
 */
@RestController
@RequestMapping("/api/equipment")
public class EquipmentRepo {

    @Autowired
    private EquipmentRepo equipmentRepo;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Equipment> findAll() {
        return equipmentRepo.findAll();
    }

    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    @ResponseBody
    public Equipment findById(@PathVariable("id") Long id) {
        return equipmentRepo.findById(id);
    }
}

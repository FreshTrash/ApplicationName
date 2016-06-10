package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.home.model.Equipment;
import ru.home.repo.EquipmentRepo;

import java.util.List;

/**
 * Created by Maksim on 03.06.2016.
 */
@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

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
        return equipmentRepo.findOne(id);
    }

    @RequestMapping(method=RequestMethod.PUT)
    @ResponseBody
    public List<Equipment> saveOrEdit(@RequestBody List<Equipment> equipments) {
        return equipmentRepo.save(equipments);
    }
}

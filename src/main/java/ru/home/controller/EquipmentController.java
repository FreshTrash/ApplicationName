package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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

    @Secured("ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
        equipmentRepo.delete(id);
        return new ResponseEntity<>("Элемент успешно удален", HttpStatus.OK);
    }
}

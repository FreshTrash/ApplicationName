package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.home.model.ASUElement;
import ru.home.repo.ASUElementRepo;

import java.util.List;

/**
 * Created by Maksim on 02.06.2016.
 */
@RestController
@RequestMapping("/api/asu_element")
public class ASUElementController {

    @Autowired
    private ASUElementRepo elementRepo;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<ASUElement> findAll() {
        return elementRepo.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ASUElement findById(@PathVariable("id") Long id) {
        return elementRepo.findOne(id);
    }
}

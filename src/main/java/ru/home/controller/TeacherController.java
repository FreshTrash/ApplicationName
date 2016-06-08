package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.User;
import ru.home.repo.UserRepo;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private UserRepo userRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<User> findAll() {
        return userRepo.findAll();
    }
    @RequestMapping(method = RequestMethod.POST)
    public List<User> save(@RequestBody List<User> users) {
        return userRepo.save(users);
    }
}

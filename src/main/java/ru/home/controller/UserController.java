package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.home.model.User;
import ru.home.repo.UserRepo;


/**
 * Created by karimov on 08.06.2016.
 */
@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @RequestMapping(value = "/api/user/current", method = RequestMethod.GET)
    public Object currentUser() {
        return getPrincipal();
    }

    @RequestMapping(value = "/api/user", method = RequestMethod.PUT)
    @ResponseBody
    public User saveUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    @Secured("ADMIN")
    @RequestMapping(value = "/api/admin", method = RequestMethod.PUT)
    @ResponseBody
    public User saveAdmin(@RequestBody User user) {
        return userRepo.save(user);
    }

    private Object getPrincipal(){
        Object user = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            user = principal;
        } else {
            user = principal;
        }
        return user;
    }
}

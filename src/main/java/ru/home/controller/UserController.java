package ru.home.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by karimov on 08.06.2016.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @RequestMapping(value = "/current", method = RequestMethod.GET)
    public Object currentUser() {
        return getPrincipal();
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

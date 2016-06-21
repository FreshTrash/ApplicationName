package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.home.model.MyUser;
import ru.home.model.UserRole;
import ru.home.repo.UserRepo;
import ru.home.repo.UserRoleRepo;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Created by karimov on 08.06.2016.
 */
@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserRoleRepo userRolesRepo;


    @RequestMapping(value = "/api/user/current", method = RequestMethod.GET)
    public MyUser currentUser() {
        User userDetail = (User)getPrincipal();
        List<MyUser> allUsers = userRepo.findAll();
        return allUsers.stream().filter(user -> user.getUsername().equals(userDetail.getUsername())).collect(Collectors.toList()).get(0);
    }

    @RequestMapping(value = "/api/user", method = RequestMethod.PUT)
    @ResponseBody
    public MyUser saveUser(@RequestBody MyUser myUser) {
        UserRole userRole = new UserRole();
        userRole.setRole("ROLE_USER");
        userRole.setUserName(myUser.getUsername());
        userRolesRepo.save(userRole);
        return this.userRepo.save(myUser);
    }

    @Secured("ADMIN")
    @RequestMapping(value = "/api/admin", method = RequestMethod.PUT)
    @ResponseBody
    public MyUser saveAdmin(@RequestBody MyUser myUser) {
        UserRole userRole = new UserRole();
        userRole.setRole("ROLE_ADMIN");
        userRole.setUserName(myUser.getUsername());
        userRolesRepo.save(userRole);
        return userRepo.save(myUser);
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

package ru.home.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by karimov on 08.06.2016.
 */
@RestController
@RequestMapping("/Access_Denied")
public class ErrorController {

    @RequestMapping(method = RequestMethod.GET)
    public String printError() {
        return "Доступ запрещен!";
    }
}

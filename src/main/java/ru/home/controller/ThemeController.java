package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.home.model.Theme;
import ru.home.repo.ThemeRepo;

import java.util.List;

/**
 * Created by Maksim on 28.05.2016.
 */
@RestController
@RequestMapping("/api/theme")
public class ThemeController {

    @Autowired
    private ThemeRepo themeRepo;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Theme> findAll() {
        return themeRepo.findAll();
    }

    @RequestMapping(value = "/{themeId}", method = RequestMethod.GET)
    @ResponseBody
    public Theme getById(@PathVariable("themeId") Long id) {
        return themeRepo.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public List<Theme> save (@RequestBody List<Theme> themes) {
        return themeRepo.save(themes);
    }
}

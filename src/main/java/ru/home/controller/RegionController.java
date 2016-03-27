package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.Region;
import ru.home.model.Student;
import ru.home.repo.RegionRepo;
import ru.home.repo.StudentRepo;

import java.util.List;

@RestController
public class RegionController {

    @Autowired
    private RegionRepo regionRepo;

    @RequestMapping("/region")
    public List<Region> findAll() {
        Region region = new Region();
        region.setName("Saratov");
        regionRepo.save(region);

        return regionRepo.findAll();
    }
}

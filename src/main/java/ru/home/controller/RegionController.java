package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.Region;
import ru.home.repo.RegionRepo;

import java.util.List;

@RestController
@RequestMapping("/api/region")
public class RegionController {

    @Autowired
    private RegionRepo regionRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Region> findAll() {
        Region region = new Region();
        region.setName("Saratov");
        regionRepo.save(region);

        return regionRepo.findAll();
    }
}

package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.Region;
import ru.home.model.University;
import ru.home.repo.RegionRepo;
import ru.home.repo.UniversityRepo;

import java.util.List;

@RestController
public class UniversityController {

    @Autowired
    private UniversityRepo universityRepo;
    @Autowired
    private RegionRepo regionRepo;

    @RequestMapping("/univer")
    public List<University> findAll() {
        University university = new University();
        university.setName("SSTU");
        Region r = new Region();
        r.setName("saratov1");

        university.setRegion(regionRepo.save(r));
        universityRepo.save(university);

        return universityRepo.findAll();
    }
}

package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.Student;
import ru.home.model.Teacher;
import ru.home.repo.StudentRepo;
import ru.home.repo.TeacherRepo;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherRepo teacherRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Teacher> findAll() {
        return teacherRepo.findAll();
    }
    @RequestMapping(method = RequestMethod.POST)
    public List<Teacher> save(@RequestBody List<Teacher> teachers) {
        return teacherRepo.save(teachers);
    }
}

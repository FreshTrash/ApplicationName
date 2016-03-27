package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.Student;
import ru.home.repo.StudentRepo;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Student> findAll() {
        for(int i=0; i< 10; i++) {
            Student user = new Student();
            user.setFirstName("Maxim");
            studentRepo.save(user);
        }

        return studentRepo.findAll();
    }
}

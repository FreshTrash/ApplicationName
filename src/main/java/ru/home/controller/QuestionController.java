package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.home.model.Answer;
import ru.home.model.Question;
import ru.home.model.Region;
import ru.home.repo.QuestionRepo;
import ru.home.repo.RegionRepo;

import java.util.List;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

    @Autowired
    private QuestionRepo questionRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Question> findAll() {
        Question question = new Question();
        question.setText("lol?");
        questionRepo.save(question);

        return questionRepo.findAll();
    }
}

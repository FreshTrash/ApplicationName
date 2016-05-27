package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.home.model.Answer;
import ru.home.model.Question;
import ru.home.repo.AnswerRepo;
import ru.home.repo.QuestionRepo;

import java.util.List;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {

    @Autowired
    private AnswerRepo answerRepo;
    @Autowired
    private QuestionRepo questionRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Answer> findAll() {
        return answerRepo.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public List<Answer> save(@RequestBody List<Answer> answers) {
        return answerRepo.save(answers);
    }
}

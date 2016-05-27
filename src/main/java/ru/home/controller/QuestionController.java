package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.home.model.Answer;
import ru.home.model.Question;
import ru.home.repo.AnswerRepo;
import ru.home.repo.QuestionRepo;

import java.util.List;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private AnswerRepo answerRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Question> findAll() {
        return questionRepo.findAll();
    }

    @RequestMapping(value = "/{questionId}")
    @ResponseBody
    public Question findById(@PathVariable("questionId") Long questionId) {
        return questionRepo.findOne(questionId);
    }
/*
    @RequestMapping(value = "/{questionId}/answers")
    @ResponseBody
    public List<Answer> getAnswerByQuestion(@PathVariable("questionId") Long questionId) {
        return answerRepo.getByQuestion(questionRepo.getOne(questionId));
    }*/

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public List<Question> save(@RequestBody List<Question> questions) {
        return questionRepo.save(questions);
    }
}

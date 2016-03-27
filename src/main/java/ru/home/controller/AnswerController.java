package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
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
        Answer answer = new Answer();
        answer.setAnswer("lol");
        answer.setQuestion(questionRepo.findAll().get(0));
        answerRepo.save(answer);

        return answerRepo.findAll();
    }
}

package ru.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import ru.home.model.Test;
import ru.home.model.dto.CheckQuestion;
import ru.home.repo.QuestionRepo;
import ru.home.repo.TestRepo;
import ru.home.service.QuestionService;

import java.util.List;

/**
 * Created by Maksim on 27.05.2016.
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestRepo testRepo;
    @Autowired
    private QuestionService questionService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Test> findAll() {
        return testRepo.findAll();
    }

    //@Secured({"ROLE_USER", "ROLE_ADMIN"})
    @RequestMapping(value = "/{testId}", method = RequestMethod.GET)
    @ResponseBody
    public Test findById(@PathVariable("testId") Long testId) {
        return testRepo.findOne(testId);
    }

    @RequestMapping(value="/{testId}/check", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> checkTest(@PathVariable("testId") Long testId, @RequestBody List<CheckQuestion> checkQuestions) {
        long correctAnswerCount = checkQuestions.stream().filter(q -> questionService.isSelectedAnswer(q.getQuestionId(), q.getSelectedAnswerId())).count();
        String formatted = String.format("%3f", (double)correctAnswerCount/checkQuestions.size());
        return new ResponseEntity<>(formatted, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public @ResponseBody List<Test> save(@RequestBody List<Test> tests) {
        return testRepo.save(tests);
    }
}

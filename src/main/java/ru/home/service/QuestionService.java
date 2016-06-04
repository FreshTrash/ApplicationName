package ru.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.home.repo.AnswerRepo;
import ru.home.repo.QuestionRepo;

/**
 * Created by Maksim on 28.05.2016.
 */
@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private AnswerRepo answerRepo;

    public Boolean isSelectedAnswer(Long questionId, Long answerId) {
        return answerRepo.findOne(answerId).isCorrect();
    }
}

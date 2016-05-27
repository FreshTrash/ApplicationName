package ru.home.repo;

/**
 * Created by Maksim on 20.02.2016.
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.home.model.Answer;
import ru.home.model.Question;

import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer, Long> {
   // @Query("from Answer a where a.question.questionId= : questionId")
}

package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.home.model.Answer;
import ru.home.model.Question;

import java.util.List;

/**
 * Created by Maksim on 20.02.2016.
 */
public interface QuestionRepo extends JpaRepository<Question, Long> {
}

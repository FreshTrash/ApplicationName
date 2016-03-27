package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.Question;

/**
 * Created by Maksim on 20.02.2016.
 */
public interface QuestionRepo extends JpaRepository<Question, Long> {
}

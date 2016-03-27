package ru.home.repo;

/**
 * Created by Maksim on 20.02.2016.
 */

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.Answer;

public interface AnswerRepo extends JpaRepository<Answer, Long> {
}

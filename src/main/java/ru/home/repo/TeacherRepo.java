package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.Teacher;

/**
 * Created by Maksim on 20.02.2016.
 */
public interface TeacherRepo extends JpaRepository<Teacher, Long> {
}

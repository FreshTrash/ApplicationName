package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.Student;

/**
 * Created by Maksim on 20.02.2016.
 */
public interface StudentRepo extends JpaRepository<Student, Long> {
}

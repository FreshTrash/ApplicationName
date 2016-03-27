package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.Lection;

/**
 * Created by Maksim on 23.02.2016.
 */
public interface LectionRepo extends JpaRepository<Lection, Long> {
}

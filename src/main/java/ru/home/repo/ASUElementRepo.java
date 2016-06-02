package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.ASUElement;

/**
 * Created by Maksim on 02.06.2016.
 */
public interface ASUElementRepo extends JpaRepository<ASUElement, Long> {
}

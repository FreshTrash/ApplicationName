package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.User;

/**
 * Created by Maksim on 20.02.2016.
 */
public interface UserRepo extends JpaRepository<User, Long> {
}

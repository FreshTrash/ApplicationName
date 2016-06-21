package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.home.model.UserRole;

/**
 * Created by Maksim on 21.06.2016.
 */
public interface UserROlesRepo extends JpaRepository<UserRole, String> {
}

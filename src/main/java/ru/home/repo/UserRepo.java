package ru.home.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.home.model.MyUser;

/**
 * Created by Maksim on 20.02.2016.
 */
public interface UserRepo extends JpaRepository<MyUser, Long> {
}

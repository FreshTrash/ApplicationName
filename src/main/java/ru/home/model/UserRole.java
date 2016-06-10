package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by karimov on 08.06.2016.
 */
@Getter
@Setter
@Entity
@Table(name = "user_roles")
public class UserRole {
    @Id
    private String userName;
    private String role;
}

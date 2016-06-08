package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by karimov on 08.06.2016.
 */
@Getter
@Setter
@Entity
@Table(name = "user_roles")
public class UserRole {
    private String userName;
    private String role;
}

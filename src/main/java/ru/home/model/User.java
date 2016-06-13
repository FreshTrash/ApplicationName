package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by maksim on 09/02/15.
 */
@Getter
@Setter
@Entity
@Table(name = "_user", uniqueConstraints=
@UniqueConstraint(name="username_unique_key", columnNames={"user_name"}))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "middle_name")
    private String middleName;
    @Column(name = "type")
    private String type;
    @Column(name = "user_name")
    private String username;
    @Column(name = "enabled")
    private Boolean enabled;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    //TODO: add direction, level etc.
}

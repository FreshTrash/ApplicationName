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
@Table(name = "users", uniqueConstraints=
@UniqueConstraint(name="username_unique_key", columnNames={"username"}))
@SequenceGenerator(name="_user_seq", initialValue=200, allocationSize=100)

public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_user_seq")
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
    @Column(name = "username")
    private String username;
    @Column(name = "enabled")
    private Boolean enabled;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    //TODO: add direction, level etc.
}

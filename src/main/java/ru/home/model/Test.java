package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

/**
 * Created by maksim on 09/02/15.
 */
@Getter
@Setter
@Entity
@Table(name = "test")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "test_id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "author_id")
    private int authorId;
    @Column(name = "theme_id")
    private int themeId;
    @Column(name = "date")
    private Date date;
    @Column(name = "time_to_test")
    private int timeToTest;


}

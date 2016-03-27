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
@Table(name="lection")
public class Lection {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "lection_id")
    private int id;
    @Column(name = "name")
    private String name;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;
}

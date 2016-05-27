package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by maksim on 26/02/15.
 */
@Getter
@Setter
@Entity
@Table(name = "theme")
public class Theme implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "theme_id")
    private Long id;
    @Column(name = "name")
    private String name;

}

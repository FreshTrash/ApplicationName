package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by Maksim on 20.02.2016.
 */
@Getter
@Setter
@Entity
@Table(name="deportment")
public class Deportment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="deportment_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;
}

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
@Table(name="direction")
public class Direction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="direction_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "deportment_id")
    private Deportment deportment;
}

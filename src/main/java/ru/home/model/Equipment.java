package ru.home.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by Maksim on 02.06.2016.
 */
@Getter
@Setter
@Entity
@SequenceGenerator(name="equipment_seq", initialValue=200, allocationSize=100)
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_seq")
    private Long id;

    private String name;
}

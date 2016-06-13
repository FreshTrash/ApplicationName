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
@Table(name = "asu_element")
@SequenceGenerator(name="asu_element_seq", initialValue=200, allocationSize=100)
public class ASUElement {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "asu_element_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private String name;

    private Double intensity;
}

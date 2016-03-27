package ru.home.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Maksim on 20.02.2016.
 */
@Getter
@Setter
@Entity
@Table(name="region")
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="region_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "region")
    private List<University> universities;
}

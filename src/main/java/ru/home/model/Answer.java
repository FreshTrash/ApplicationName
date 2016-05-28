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
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "answer_id")
    private Long id;

    @Column(name = "question_id")
    private Long questionId;
    @Column(name = "answer")
    private String answer;
    @Column(name = "correct")
    private boolean correct;

}

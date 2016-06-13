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
@SequenceGenerator(name="answer_seq", initialValue=200, allocationSize=100)
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "answer_seq")
    @Column(name = "answer_id")
    private Long id;

    @Column(name = "question_id")
    private Long questionId;
    @Column(name = "answer")
    private String answer;
    @Column(name = "correct")
    private boolean correct;

}

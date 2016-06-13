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
@Table(name = "question")
@SequenceGenerator(name="question_seq", initialValue=200, allocationSize=100)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "question_seq")
    @Column(name = "question_id")
    private Long id;
    @Column(name = "test_id")
    private Long testId;
    @Column(name = "text")
    private String text;
    @Column(name = "type")
    private Long type;
    @Column(name = "date")
    private Date date;

    @OneToMany(mappedBy = "questionId")
    private List<Answer> answers;

}

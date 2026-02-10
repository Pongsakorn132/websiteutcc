package org.example.utcctp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "report_grades")
public class ReportGrade {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private Report report;

    @ManyToOne
    @JoinColumn(name = "grader_id")
    private User grader;

    @Column
    private Double score;

    @Column(columnDefinition = "text")
    private String comment;

    @Column(name = "graded_at", nullable = false)
    private Instant gradedAt = Instant.now();

    public UUID getId() {
        return id;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public User getGrader() {
        return grader;
    }

    public void setGrader(User grader) {
        this.grader = grader;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Instant getGradedAt() {
        return gradedAt;
    }
}

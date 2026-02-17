package org.example.utcctp.repository;

import org.example.utcctp.model.ReportGrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReportGradeRepository extends JpaRepository<ReportGrade, UUID> {
}

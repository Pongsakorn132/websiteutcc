package org.example.utcctp.repository;

import org.example.utcctp.model.ApprovalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ApprovalHistoryRepository extends JpaRepository<ApprovalHistory, UUID> {
}

package org.example.utcctp.repository;

import org.example.utcctp.model.AiRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AiRequestRepository extends JpaRepository<AiRequest, UUID> {
}

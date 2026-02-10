package org.example.utcctp.repository;

import org.example.utcctp.model.TripDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TripDocumentRepository extends JpaRepository<TripDocument, UUID> {
}

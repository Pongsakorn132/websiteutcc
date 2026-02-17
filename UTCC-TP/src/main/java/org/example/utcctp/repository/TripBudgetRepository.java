package org.example.utcctp.repository;

import org.example.utcctp.model.TripBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TripBudgetRepository extends JpaRepository<TripBudget, UUID> {
}

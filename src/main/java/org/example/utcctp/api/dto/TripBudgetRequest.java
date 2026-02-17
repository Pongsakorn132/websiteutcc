package org.example.utcctp.api.dto;

public record TripBudgetRequest(
        String category,
        int amount
) {
}

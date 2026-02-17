package org.example.utcctp.api.dto;

import java.util.UUID;

public record TripBudgetResponse(
        UUID id,
        String category,
        int amount
) {
}

package org.example.utcctp.api.dto;

import java.util.List;

public record TripDetailResponse(
        TripResponse trip,
        List<TripScheduleResponse> schedules,
        List<TripBudgetResponse> budgets,
        List<TripDocumentResponse> documents
) {
}

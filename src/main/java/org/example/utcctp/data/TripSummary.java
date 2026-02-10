package org.example.utcctp.data;

import java.time.LocalDate;

public record TripSummary(
        String id,
        String title,
        String location,
        String status,
        LocalDate startDate,
        LocalDate endDate,
        int applicants,
        int capacity,
        int budget
) {
}

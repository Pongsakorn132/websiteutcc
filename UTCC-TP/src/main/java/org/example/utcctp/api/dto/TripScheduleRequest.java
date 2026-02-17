package org.example.utcctp.api.dto;

import java.time.Instant;

public record TripScheduleRequest(
        Instant startTime,
        Instant endTime,
        String activity
) {
}

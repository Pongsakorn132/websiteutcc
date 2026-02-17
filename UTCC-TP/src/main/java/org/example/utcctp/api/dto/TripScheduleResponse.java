package org.example.utcctp.api.dto;

import java.time.Instant;
import java.util.UUID;

public record TripScheduleResponse(
        UUID id,
        Instant startTime,
        Instant endTime,
        String activity
) {
}

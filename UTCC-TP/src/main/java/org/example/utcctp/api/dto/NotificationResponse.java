package org.example.utcctp.api.dto;

import java.time.Instant;
import java.util.UUID;

public record NotificationResponse(
        UUID id,
        String title,
        String message,
        String type,
        String status,
        Instant createdAt
) {
}

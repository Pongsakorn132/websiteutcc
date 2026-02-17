package org.example.utcctp.api.dto;

import java.time.Instant;
import java.util.UUID;

public record ApplicationResponse(
        UUID id,
        String studentName,
        String studentMajor,
        String type,
        String status,
        String tripTitle,
        String internshipTitle,
        Instant createdAt
) {
}

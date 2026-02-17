package org.example.utcctp.api.dto;

import java.time.Instant;
import java.util.UUID;

public record ReportResponse(
        UUID id,
        String title,
        String status,
        Instant submittedAt,
        UUID fileId
) {
}

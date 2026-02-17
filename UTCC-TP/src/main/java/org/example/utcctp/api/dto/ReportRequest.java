package org.example.utcctp.api.dto;

import java.util.UUID;

public record ReportRequest(
        UUID tripId,
        UUID internshipPositionId,
        UUID fileId
) {
}

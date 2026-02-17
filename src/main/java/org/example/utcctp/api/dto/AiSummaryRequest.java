package org.example.utcctp.api.dto;

import java.util.UUID;

public record AiSummaryRequest(
        UUID reportId,
        String language
) {
}

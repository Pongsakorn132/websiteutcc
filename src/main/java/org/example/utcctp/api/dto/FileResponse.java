package org.example.utcctp.api.dto;

import java.util.UUID;

public record FileResponse(
        UUID id,
        String originalName,
        String contentType,
        long sizeBytes
) {
}

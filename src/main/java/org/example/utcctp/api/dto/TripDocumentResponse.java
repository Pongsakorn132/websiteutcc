package org.example.utcctp.api.dto;

import java.util.UUID;

public record TripDocumentResponse(
        UUID id,
        String docType,
        UUID fileId,
        String fileName
) {
}

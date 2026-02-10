package org.example.utcctp.api.dto;

import java.util.UUID;

public record TripDocumentRequest(
        String docType,
        UUID fileId
) {
}

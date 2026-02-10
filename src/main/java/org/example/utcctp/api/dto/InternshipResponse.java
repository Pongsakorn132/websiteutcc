package org.example.utcctp.api.dto;

import java.util.UUID;

public record InternshipResponse(
        UUID id,
        String company,
        String title,
        String location,
        String mode,
        int slots,
        String status
) {
}

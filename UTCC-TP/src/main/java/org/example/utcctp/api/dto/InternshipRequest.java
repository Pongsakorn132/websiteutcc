package org.example.utcctp.api.dto;

import java.util.UUID;

public record InternshipRequest(
        UUID companyId,
        String title,
        String description,
        String requirements,
        String location,
        String mode,
        int slots,
        String status
) {
}

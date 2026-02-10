package org.example.utcctp.data;

public record InternshipSummary(
        String id,
        String company,
        String title,
        String location,
        String mode,
        int slots,
        int openSlots
) {
}

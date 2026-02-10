package org.example.utcctp.data;

public record ApplicationSummary(
        String id,
        String studentName,
        String program,
        String type,
        String status
) {
}

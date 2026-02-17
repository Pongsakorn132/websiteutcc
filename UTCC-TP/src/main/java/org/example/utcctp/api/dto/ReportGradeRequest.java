package org.example.utcctp.api.dto;

public record ReportGradeRequest(
        Double score,
        String comment
) {
}

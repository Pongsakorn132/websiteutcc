package org.example.utcctp.data;

public record ReportSummary(
        String id,
        String title,
        String status,
        String dueDate,
        int pending
) {
}

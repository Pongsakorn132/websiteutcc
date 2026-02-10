package org.example.utcctp.data;

public record DashboardSummary(
        int activeTrips,
        int pendingApps,
        int reportsDue,
        int internshipSlots,
        int unmatchedSlots,
        String role
) {
}

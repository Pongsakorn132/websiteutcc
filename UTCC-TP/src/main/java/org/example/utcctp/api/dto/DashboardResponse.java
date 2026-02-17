package org.example.utcctp.api.dto;

public record DashboardResponse(
        int activeTrips,
        int pendingApps,
        int reportsDue,
        int internshipSlots,
        int unmatchedSlots,
        String role
) {
}

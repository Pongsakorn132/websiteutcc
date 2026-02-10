package org.example.utcctp.api.dto;

public record AnalyticsOverviewResponse(
        long trips,
        long internships,
        long applications,
        long reports
){
}

package org.example.utcctp.data;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DemoDataService {
    private final List<TripSummary> trips = List.of(
            new TripSummary(
                    "TRIP-2026-01",
                    "Industry Visit 2026",
                    "Bangkok",
                    "PENDING",
                    LocalDate.of(2026, 3, 1),
                    LocalDate.of(2026, 3, 2),
                    32,
                    40,
                    150_000
            ),
            new TripSummary(
                    "TRIP-2026-02",
                    "Smart Factory Tour",
                    "Chonburi",
                    "PUBLISHED",
                    LocalDate.of(2026, 4, 10),
                    LocalDate.of(2026, 4, 10),
                    28,
                    35,
                    90_000
            ),
            new TripSummary(
                    "TRIP-2026-03",
                    "Research Lab Visit",
                    "Pathum Thani",
                    "DRAFT",
                    LocalDate.of(2026, 5, 3),
                    LocalDate.of(2026, 5, 3),
                    0,
                    30,
                    60_000
            )
    );

    private final List<InternshipSummary> internships = List.of(
            new InternshipSummary("INT-001", "TechNova Co.", "Data Analyst", "Bangkok", "Hybrid", 8, 3),
            new InternshipSummary("INT-002", "GreenGrid Energy", "Process Engineer", "Chonburi", "On-site", 5, 1),
            new InternshipSummary("INT-003", "Metro Logistics", "Operations Optimizer", "Pathum Thani", "On-site", 6, 2)
    );

    private final List<ApplicationSummary> applications = List.of(
            new ApplicationSummary("APP-001", "Natthanon P.", "Computer Science", "Trip", "PENDING"),
            new ApplicationSummary("APP-002", "Thipwara K.", "Industrial Eng.", "Internship", "APPROVED"),
            new ApplicationSummary("APP-003", "Worawit S.", "Data Science", "Trip", "DRAFT")
    );

    private final List<ReportSummary> reports = List.of(
            new ReportSummary("REP-001", "Industry Visit 2026", "AWAITING_REVIEW", "2026-03-12", 6),
            new ReportSummary("REP-002", "Internship Q2", "IN_PROGRESS", "2026-04-18", 12)
    );

    public DashboardSummary dashboardFor(String role) {
        if ("STUDENT".equals(role)) {
            return new DashboardSummary(2, 1, 1, 18, 5, role);
        }
        if ("STAFF".equals(role)) {
            return new DashboardSummary(5, 3, 4, 84, 12, role);
        }
        if ("ADMIN".equals(role)) {
            return new DashboardSummary(5, 3, 4, 84, 12, role);
        }
        return new DashboardSummary(5, 3, 4, 84, 12, role);
    }

    public List<TripSummary> listTrips() {
        return trips;
    }

    public List<InternshipSummary> listInternships() {
        return internships;
    }

    public List<ApplicationSummary> listApplications(String role) {
        if ("STUDENT".equals(role)) {
            return applications.stream().limit(2).toList();
        }
        return applications;
    }

    public List<ReportSummary> listReports(String role) {
        if ("STUDENT".equals(role)) {
            return reports.stream().limit(1).toList();
        }
        return reports;
    }
}

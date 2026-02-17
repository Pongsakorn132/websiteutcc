package org.example.utcctp.analytics;

import org.example.utcctp.api.dto.AnalyticsOverviewResponse;
import org.example.utcctp.repository.ApplicationRepository;
import org.example.utcctp.repository.InternshipPositionRepository;
import org.example.utcctp.repository.ReportRepository;
import org.example.utcctp.repository.TripRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    private final TripRepository tripRepository;
    private final InternshipPositionRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final ReportRepository reportRepository;

    public AnalyticsService(
            TripRepository tripRepository,
            InternshipPositionRepository internshipRepository,
            ApplicationRepository applicationRepository,
            ReportRepository reportRepository
    ) {
        this.tripRepository = tripRepository;
        this.internshipRepository = internshipRepository;
        this.applicationRepository = applicationRepository;
        this.reportRepository = reportRepository;
    }

    public AnalyticsOverviewResponse overview() {
        return new AnalyticsOverviewResponse(
                tripRepository.count(),
                internshipRepository.count(),
                applicationRepository.count(),
                reportRepository.count()
        );
    }
}

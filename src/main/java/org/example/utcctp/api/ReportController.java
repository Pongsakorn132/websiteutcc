package org.example.utcctp.api;

import org.example.utcctp.data.DemoDataService;
import org.example.utcctp.data.ReportSummary;
import org.example.utcctp.util.AuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {
    private final DemoDataService demoDataService;

    public ReportController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public List<ReportSummary> listReports(Authentication authentication) {
        return demoDataService.listReports(AuthUtils.primaryRole(authentication));
    }
}

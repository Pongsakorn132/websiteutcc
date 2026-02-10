package org.example.utcctp.api;

import org.example.utcctp.data.DashboardSummary;
import org.example.utcctp.data.DemoDataService;
import org.example.utcctp.util.AuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    private final DemoDataService demoDataService;

    public DashboardController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping("/summary")
    public DashboardSummary summary(Authentication authentication) {
        return demoDataService.dashboardFor(AuthUtils.primaryRole(authentication));
    }
}

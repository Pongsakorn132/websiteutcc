package org.example.utcctp.api;

import org.example.utcctp.data.ApplicationSummary;
import org.example.utcctp.data.DemoDataService;
import org.example.utcctp.util.AuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
public class ApplicationController {
    private final DemoDataService demoDataService;

    public ApplicationController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public List<ApplicationSummary> listApplications(Authentication authentication) {
        return demoDataService.listApplications(AuthUtils.primaryRole(authentication));
    }
}

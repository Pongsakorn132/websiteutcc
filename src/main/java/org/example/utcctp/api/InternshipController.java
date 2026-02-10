package org.example.utcctp.api;

import org.example.utcctp.data.DemoDataService;
import org.example.utcctp.data.InternshipSummary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/internships")
public class InternshipController {
    private final DemoDataService demoDataService;

    public InternshipController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public List<InternshipSummary> listInternships() {
        return demoDataService.listInternships();
    }
}

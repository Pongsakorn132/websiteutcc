package org.example.utcctp.api;

import org.example.utcctp.data.DemoDataService;
import org.example.utcctp.data.TripSummary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trips")
public class TripController {
    private final DemoDataService demoDataService;

    public TripController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public List<TripSummary> listTrips() {
        return demoDataService.listTrips();
    }
}

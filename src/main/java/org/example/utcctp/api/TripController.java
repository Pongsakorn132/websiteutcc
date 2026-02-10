package org.example.utcctp.api;

import org.example.utcctp.api.dto.TripBudgetRequest;
import org.example.utcctp.api.dto.TripBudgetResponse;
import org.example.utcctp.api.dto.TripDetailResponse;
import org.example.utcctp.api.dto.TripDocumentRequest;
import org.example.utcctp.api.dto.TripDocumentResponse;
import org.example.utcctp.api.dto.TripRequest;
import org.example.utcctp.api.dto.TripResponse;
import org.example.utcctp.api.dto.TripScheduleRequest;
import org.example.utcctp.api.dto.TripScheduleResponse;
import org.example.utcctp.trip.TripService;
import org.example.utcctp.user.CurrentUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/trips")
public class TripController {
    private final TripService tripService;
    private final CurrentUserService currentUserService;

    public TripController(TripService tripService, CurrentUserService currentUserService) {
        this.tripService = tripService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<TripResponse> listTrips() {
        return tripService.listTrips();
    }

    @GetMapping("/{id}")
    public TripDetailResponse getTrip(@PathVariable UUID id) {
        return tripService.getTrip(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADVISOR') or hasRole('STAFF') or hasRole('ADMIN')")
    public TripResponse createTrip(@RequestBody TripRequest request) {
        return tripService.createTrip(request, currentUserService.requireUser());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADVISOR') or hasRole('STAFF') or hasRole('ADMIN')")
    public TripResponse updateTrip(@PathVariable UUID id, @RequestBody TripRequest request) {
        return tripService.updateTrip(id, request);
    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADVISOR') or hasRole('STAFF') or hasRole('ADMIN')")
    public TripResponse publishTrip(@PathVariable UUID id) {
        return tripService.publishTrip(id);
    }

    @PostMapping("/{id}/schedule")
    @PreAuthorize("hasRole('ADVISOR') or hasRole('STAFF') or hasRole('ADMIN')")
    public TripScheduleResponse addSchedule(@PathVariable UUID id, @RequestBody TripScheduleRequest request) {
        return tripService.addSchedule(id, request);
    }

    @PostMapping("/{id}/budget")
    @PreAuthorize("hasRole('ADVISOR') or hasRole('STAFF') or hasRole('ADMIN')")
    public TripBudgetResponse addBudget(@PathVariable UUID id, @RequestBody TripBudgetRequest request) {
        return tripService.addBudget(id, request);
    }

    @PostMapping("/{id}/documents")
    @PreAuthorize("hasRole('ADVISOR') or hasRole('STAFF') or hasRole('ADMIN')")
    public TripDocumentResponse addDocument(@PathVariable UUID id, @RequestBody TripDocumentRequest request) {
        return tripService.addDocument(id, request);
    }
}

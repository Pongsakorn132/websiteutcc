package org.example.utcctp.api;

import org.example.utcctp.api.dto.UserRequest;
import org.example.utcctp.api.dto.UserResponse;
import org.example.utcctp.user.UserAdminService;
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
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserAdminService userAdminService;

    public AdminController(UserAdminService userAdminService) {
        this.userAdminService = userAdminService;
    }

    @GetMapping("/users")
    public List<UserResponse> listUsers() {
        return userAdminService.listUsers();
    }

    @PostMapping("/users")
    public UserResponse createUser(@RequestBody UserRequest request) {
        return userAdminService.createUser(request);
    }

    @PutMapping("/users/{id}")
    public UserResponse updateUser(@PathVariable UUID id, @RequestBody UserRequest request) {
        return userAdminService.updateUser(id, request);
    }
}

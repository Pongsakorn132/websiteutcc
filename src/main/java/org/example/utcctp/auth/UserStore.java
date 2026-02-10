package org.example.utcctp.auth;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class UserStore {
    private final Map<String, DemoUser> users = new HashMap<>();

    public UserStore() {
        // Demo users for development only.
        add("student1", "pass123", "Natthanon P.", List.of("STUDENT"));
        add("advisor1", "pass123", "Dr. Suda N.", List.of("ADVISOR"));
        add("staff1", "pass123", "Faculty Staff", List.of("STAFF"));
        add("admin1", "pass123", "System Admin", List.of("ADMIN"));
    }

    private void add(String username, String password, String displayName, List<String> roles) {
        users.put(username, new DemoUser(UUID.randomUUID(), username, password, displayName, roles));
    }

    public Optional<DemoUser> authenticate(String username, String password) {
        DemoUser user = users.get(username);
        if (user == null || !user.password().equals(password)) {
            return Optional.empty();
        }
        return Optional.of(user);
    }

    public Optional<DemoUser> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }
}

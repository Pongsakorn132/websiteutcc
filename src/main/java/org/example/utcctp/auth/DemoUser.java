package org.example.utcctp.auth;

import java.util.List;
import java.util.UUID;

public record DemoUser(
        UUID id,
        String username,
        String password,
        String displayName,
        List<String> roles
) {
}

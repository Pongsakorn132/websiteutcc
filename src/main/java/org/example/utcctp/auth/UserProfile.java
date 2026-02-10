package org.example.utcctp.auth;

import java.util.List;
import java.util.UUID;

public record UserProfile(
        UUID id,
        String username,
        String displayName,
        List<String> roles
) {
    public static UserProfile from(DemoUser user) {
        return new UserProfile(user.id(), user.username(), user.displayName(), user.roles());
    }
}

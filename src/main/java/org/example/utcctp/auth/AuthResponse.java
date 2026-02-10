package org.example.utcctp.auth;

public record AuthResponse(
        String token,
        UserProfile user
) {
    public static AuthResponse from(DemoUser user, String token) {
        return new AuthResponse(token, UserProfile.from(user));
    }
}

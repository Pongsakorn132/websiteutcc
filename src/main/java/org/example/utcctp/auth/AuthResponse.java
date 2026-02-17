package org.example.utcctp.auth;

public record AuthResponse(
        String token,
        UserProfile user
) {
    public static AuthResponse from(org.example.utcctp.model.User user, String token) {
        return new AuthResponse(token, UserProfile.from(user));
    }
}

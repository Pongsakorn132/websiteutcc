package org.example.utcctp.util;

import org.springframework.security.core.Authentication;

public final class AuthUtils {
    private AuthUtils() {
    }

    public static String primaryRole(Authentication authentication) {
        if (authentication == null || authentication.getAuthorities() == null) {
            return "GUEST";
        }
        return authentication.getAuthorities().stream()
                .map(auth -> auth.getAuthority().replace("ROLE_", ""))
                .findFirst()
                .orElse("GUEST");
    }
}

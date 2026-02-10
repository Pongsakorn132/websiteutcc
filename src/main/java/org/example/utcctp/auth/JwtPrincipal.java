package org.example.utcctp.auth;

import java.util.List;

public record JwtPrincipal(String username, List<String> roles) {
}

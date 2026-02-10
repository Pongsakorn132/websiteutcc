package org.example.utcctp.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class JwtService {
    private final String issuer;
    private final String secret;
    private final long expiryMinutes;

    public JwtService(
            @Value("${app.jwt.issuer}") String issuer,
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiryMinutes}") long expiryMinutes
    ) {
        this.issuer = issuer;
        this.secret = secret;
        this.expiryMinutes = expiryMinutes;
    }

    public String generateToken(DemoUser user) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        Instant now = Instant.now();
        return JWT.create()
                .withIssuer(issuer)
                .withSubject(user.username())
                .withIssuedAt(now)
                .withExpiresAt(now.plus(expiryMinutes, ChronoUnit.MINUTES))
                .withClaim("roles", user.roles())
                .sign(algorithm);
    }

    public JwtPrincipal parseToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm).withIssuer(issuer).build();
            DecodedJWT decoded = verifier.verify(token);
            String username = decoded.getSubject();
            List<String> roles = decoded.getClaim("roles").asList(String.class);
            return new JwtPrincipal(username, roles);
        } catch (JWTVerificationException ex) {
            return null;
        }
    }
}

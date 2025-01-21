package com.parentlink.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Clave secreta generada automáticamente
    //private final String SECRET_KEY = "yH7kXf9LpQz6N8JmRtVbYp3Wq5KdMz4yH7kXf9LpQz6N8JmRtVbYp3Wq5KdMz4="; // Cambia esto por una clave segura
    private final long expirationTime = 3600000; // 1 hora en milisegundos

    // Generar un token JWT
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SECRET_KEY)
                .compact();
    }

    // Extraer el username del token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Validar el token
    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
package com.parentlink.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    // Bean para el PasswordEncoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuración de seguridad
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Desactiva CSRF si no lo necesitas (opcional)
                .cors().and() // Habilita CORS
                .authorizeHttpRequests(auth -> auth
                   .anyRequest().permitAll() // Permite acceso público a todas las rutas
                   //.requestMatchers("/api/userssystem/register", "/api/userssystem/login").permitAll() // Permite acceso público a estas rutas
                   //.anyRequest().authenticated() // Requiere autenticación para otras rutas
                )
                .httpBasic().disable(); // Desactiva la autenticación básica (opcional, dependiendo de tu aplicación)

        return http.build();
    }
    //SE CONFIGURA PARA PODER HACER LAS PRUEBAS CON POSTMAN
    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.addAllowedOrigin("*"); // Permitir todas las solicitudes de cualquier origen (cambiar en producción)
        configuration.addAllowedMethod("*"); // Permitir todos los métodos HTTP
        configuration.addAllowedHeader("*"); // Permitir todos los encabezados
        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
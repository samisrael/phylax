package com.phylax.server.config;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

public class OAuth2SecurityConfig {
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){
        httpSecurity
                .authorizeHttpRequests(auth->auth
                        .anyRequest()
                        .authenticated())
                .oauth2Login(Customizer.withDefaults());

        return httpSecurity.build();
    }
}

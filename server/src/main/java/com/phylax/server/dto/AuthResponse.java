package com.phylax.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private String type;
    private UserDTO user;

    public AuthResponse(String token, UserDTO user) {
        this.token = token;
        this.type = "Bearer";
        this.user = user;
    }
}

package com.marketplace.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.Data;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // For development, create a default admin user
        if (request.getUsername().equals("admin") && request.getPassword().equals("admin")) {
            return ResponseEntity.ok(Map.of(
                "token", "development-token",
                "username", "admin"
            ));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}

@Data
class LoginRequest {
    private String username;
    private String password;
    // getters and setters
} 
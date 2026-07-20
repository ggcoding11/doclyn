package com.example.doclyn_api.controllers;

import com.example.doclyn_api.dtos.LoginRequestDTO;
import com.example.doclyn_api.dtos.LoginResponseDTO;
import com.example.doclyn_api.dtos.RegisterRequestDTO;
import com.example.doclyn_api.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDTO registerRequest) {
        authService.register(registerRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

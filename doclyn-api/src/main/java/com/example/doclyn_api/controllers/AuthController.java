package com.example.doclyn_api.controllers;

import com.example.doclyn_api.dtos.CredentialsRequestDTO;
import com.example.doclyn_api.dtos.LoginResponseDTO;
import com.example.doclyn_api.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody CredentialsRequestDTO data){
        String token = authService.login(data);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody CredentialsRequestDTO data) {
        authService.register(data);

        return ResponseEntity.ok("Usuário criado com sucesso!");
    }
}


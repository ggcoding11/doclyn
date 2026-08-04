package com.example.doclyn_api.controllers;

import com.example.doclyn_api.dtos.CredentialsRequestDTO;
import com.example.doclyn_api.dtos.LoginResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody CredentialsRequestDTO data){

    }

    @PostMapping
    public ResponseEntity<String> register()
}


package com.example.doclyn_api.controllers;

import com.example.doclyn_api.dtos.LoginRequestDTO;
import com.example.doclyn_api.dtos.LoginResponseDTO;
import com.example.doclyn_api.dtos.RegisterRequestDTO;
import com.example.doclyn_api.exceptions.UserAlreadyExists;
import com.example.doclyn_api.models.User;
import com.example.doclyn_api.repositories.UserRepository;
import com.example.doclyn_api.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dados) {
        var authToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.password());
        var authentication = authenticationManager.authenticate(authToken);

        var token = tokenService.gerarToken((User) authentication.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDTO dados) {
        if (repository.findByLogin(dados.login()) != null) {
            throw new UserAlreadyExists();
        }

        String senhaCriptografada = passwordEncoder.encode(dados.password());
        User novoUsuario = new User(dados.login(), senhaCriptografada, dados.role());

        repository.save(novoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

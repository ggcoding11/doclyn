package com.example.doclyn_api.services;

import com.example.doclyn_api.dtos.LoginRequestDTO;
import com.example.doclyn_api.dtos.LoginResponseDTO;
import com.example.doclyn_api.dtos.RegisterRequestDTO;
import com.example.doclyn_api.exceptions.UserAlreadyExists;
import com.example.doclyn_api.models.User;
import com.example.doclyn_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        var authToken = new UsernamePasswordAuthenticationToken(loginRequest.login(), loginRequest.password());
        var authentication = authenticationManager.authenticate(authToken);

        var jwtToken = tokenService.gerarToken((User) authentication.getPrincipal());

        return new LoginResponseDTO(jwtToken);
    }

    public void register(RegisterRequestDTO registerRequest) {
        if (userRepository.findByLogin(registerRequest.login()) != null) {
            throw new UserAlreadyExists();
        }

        String senhaCriptografada = passwordEncoder.encode(registerRequest.password());
        User novoUsuario = new User(registerRequest.login(), senhaCriptografada, registerRequest.role());

        userRepository.save(novoUsuario);
    }
}

package com.example.doclyn_api.services;

import com.example.doclyn_api.dtos.CredentialsRequestDTO;
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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public String login(CredentialsRequestDTO data) {
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(
                data.login(), data.password()
        );

        var authentication = authenticationManager.authenticate(usernamePassword);

        return tokenService.generateToken((User) authentication.getPrincipal());
    }

    public void register(CredentialsRequestDTO data) {
        if (userRepository.findByLogin(data.login()) != null) {
            throw new UserAlreadyExists();
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        User newUser = new User(data.login(), encryptedPassword);

        userRepository.save(newUser);
    }
}

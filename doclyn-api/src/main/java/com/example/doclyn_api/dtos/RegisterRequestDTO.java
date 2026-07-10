package com.example.doclyn_api.dtos;

import com.example.doclyn_api.enums.UserRole;

public record RegisterRequestDTO(String login, String password, UserRole role) {}

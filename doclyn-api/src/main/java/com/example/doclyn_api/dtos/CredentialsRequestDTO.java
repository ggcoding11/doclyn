package com.example.doclyn_api.dtos;

import jakarta.validation.constraints.NotBlank;

public record CredentialsRequestDTO(@NotBlank String login, @NotBlank String password) {
}

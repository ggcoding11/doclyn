package com.example.doclyn_api.dtos;

import jakarta.validation.constraints.NotBlank;

public record TokenValidationDTO(@NotBlank String token) {
}

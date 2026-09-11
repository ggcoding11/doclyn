package com.example.doclyn_api.dtos;

import com.example.doclyn_api.enums.CargoEnum;
import com.example.doclyn_api.enums.StatusEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record FuncionarioDTO(
        @NotBlank
        String nome,

        @NotBlank
        @Pattern(regexp = "\\d{11}")
        String cpf,

        @NotBlank
        @Pattern(regexp = "\\d{10,11}")
        String telefone,

        @NotBlank
        @Pattern(regexp = "^\\w+@\\w+\\.com$")
        String email,

        @NotBlank
        LocalDate dataNascimento,

        @NotBlank
        LocalDate dataAdmissao,

        @NotBlank
        CargoEnum cargo,

        @NotBlank
        StatusEnum status
)
{
}

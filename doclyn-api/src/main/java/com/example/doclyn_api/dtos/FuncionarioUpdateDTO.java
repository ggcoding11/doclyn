package com.example.doclyn_api.dtos;

import com.example.doclyn_api.enums.CargoEnum;
import com.example.doclyn_api.enums.StatusEnum;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record FuncionarioUpdateDTO(
        @NotBlank
        String nome,

        @NotBlank
        String cpf,

        @NotBlank
        String telefone,

        @NotBlank
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

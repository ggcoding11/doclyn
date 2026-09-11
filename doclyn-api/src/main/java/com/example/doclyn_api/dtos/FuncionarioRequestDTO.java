package com.example.doclyn_api.dtos;

import com.example.doclyn_api.enums.CargoEnum;
import com.example.doclyn_api.enums.StatusEnum;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record FuncionarioRequestDTO(
        @NotBlank(message = "O nome não pode ser vazio")
        String nome,

        @NotBlank(message = "O CPF não pode estar vazio")
        @Pattern(
                regexp = "\\d{11}",
                message = "O CPF deve possuir exatamente 11 números"
        )
        String cpf,

        @NotBlank(message = "O telefone não pode estar vazio")
        @Pattern(
                regexp = "\\d{11}",
                message = "O telefone deve possuir exatamente 11 números"
        )
        String telefone,

        @NotBlank(message = "O email não pode estar vazio")
        @Pattern(
                regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                message = "O email deve estar no formato correto"
        )
        String email,

        @NotNull(message = "A data de nascimento não pode estar vazia")
        @Past(message = "A data de nascimento não pode ser pra hoje ou pro futuro")
        LocalDate dataNascimento,

        @NotNull(message = "A data de admissão não pode estar vazia")
        @PastOrPresent(message = "A data de admissão não pode ser futura")
        LocalDate dataAdmissao,

        @NotNull(message = "O cargo não pode estar vazio")
        CargoEnum cargo,

        @NotNull(message = "O status não pode estar vazio")
        StatusEnum status
)
{
}

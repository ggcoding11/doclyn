package com.example.doclyn_api.models;

import com.example.doclyn_api.enums.CargoEnum;
import com.example.doclyn_api.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "TB_FUNCIONARIO")
@Data
@NoArgsConstructor
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private LocalDate dataNascimento;
    private LocalDate dataAdmissao;

    @Enumerated(EnumType.STRING)
    private CargoEnum cargo;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    public Funcionario(
            String nome,
            String cpf,
            String telefone,
            String email,
            LocalDate dataNascimento,
            LocalDate dataAdmissao,
            CargoEnum cargo,
            StatusEnum status
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.dataAdmissao = dataAdmissao;
        this.cargo = cargo;
        this.status = status;
    }
}
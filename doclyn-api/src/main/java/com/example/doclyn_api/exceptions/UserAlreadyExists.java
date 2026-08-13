package com.example.doclyn_api.exceptions;

public class UserAlreadyExists extends RuntimeException {
    public UserAlreadyExists() {
        super("Usuário já cadastrado!");
    }
}

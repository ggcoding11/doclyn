package com.example.doclyn_api.exceptions;

public class UserAlreadyExists extends RuntimeException {
    public UserAlreadyExists() {
        super("ERROR: Usuário já existente no sistema!");
    }
}

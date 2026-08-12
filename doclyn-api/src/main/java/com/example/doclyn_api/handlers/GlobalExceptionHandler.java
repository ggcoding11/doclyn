package com.example.doclyn_api.handlers;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.doclyn_api.exceptions.ResourceNotFound;
import com.example.doclyn_api.exceptions.UserAlreadyExists;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFound exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                "ERROR: " + exception.getMessage()
        );
    }

    @ExceptionHandler(UserAlreadyExists.class)
    public ResponseEntity<String> handleUserAlreadyExists(UserAlreadyExists exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                "ERROR: " + exception.getMessage()
        );
    }
}
package com.example.doclyn_api.handlers;

import com.example.doclyn_api.exceptions.ResourceNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
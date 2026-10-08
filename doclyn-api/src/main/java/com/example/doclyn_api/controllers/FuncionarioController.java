package com.example.doclyn_api.controllers;

import com.example.doclyn_api.dtos.FuncionarioRequestDTO;
import com.example.doclyn_api.models.Funcionario;
import com.example.doclyn_api.services.FuncionarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {
    @Autowired
    private FuncionarioService service;

    @GetMapping
    public ResponseEntity<Page<Funcionario>> findAll(
            @RequestParam(required = false) String searchParam,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "20") int pageSize
    ) {
        return ResponseEntity.ok(service.findAll(searchParam, sortField, sortDirection, pageNumber, pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Funcionario> save(@RequestBody @Valid FuncionarioRequestDTO dto) {
        Funcionario request = service.save(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}").buildAndExpand(request.getId()).toUri();

        return ResponseEntity.created(uri).body(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> updateById(
            @PathVariable("id") Long id, @RequestBody FuncionarioRequestDTO funcionarioNovo
    ) {
        return ResponseEntity.ok(service.updateById(id, funcionarioNovo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        service.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
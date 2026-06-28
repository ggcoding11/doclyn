package com.example.doclyn_api.services;

import com.example.doclyn_api.exceptions.ResourceNotFound;
import com.example.doclyn_api.models.Funcionario;
import com.example.doclyn_api.repositories.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository repository;

    public List<Funcionario> findAll() {
        return repository.findAll();
    }

    public Funcionario findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFound(
                "ERROR: Nenhum funcionário com esse id foi encontrado!"
        ));
    }

    public Funcionario save(Funcionario funcionario) {
        return repository.save(funcionario);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Funcionario updateById(Long id, Funcionario funcionarioNovo) {
        Funcionario funcionarioAntigo = findById(id);

        funcionarioAntigo.setCargo(funcionarioNovo.getCargo());
        funcionarioAntigo.setCpf(funcionarioNovo.getCpf());
        funcionarioAntigo.setStatus(funcionarioNovo.getStatus());

        return repository.save(funcionarioAntigo);
    }
}

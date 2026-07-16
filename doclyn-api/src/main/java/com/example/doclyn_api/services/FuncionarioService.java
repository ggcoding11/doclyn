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
    private FuncionarioRepository funcionarioRepository;

    public List<Funcionario> findAll() {
        return funcionarioRepository.findAll();
    }

    public Funcionario findById(Long id) {
        return funcionarioRepository.findById(id).orElseThrow(() -> new ResourceNotFound(
                "Nenhum funcionário com esse id foi encontrado!"
        ));
    }

    public Funcionario save(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    public void deleteById(Long id) {
        funcionarioRepository.deleteById(id);
    }

    public Funcionario updateById(Long id, Funcionario funcionarioNovo) {
        Funcionario funcionarioAntigo = findById(id);

        funcionarioAntigo.setNome(funcionarioNovo.getNome());
        funcionarioAntigo.setCpf(funcionarioNovo.getCpf());
        funcionarioAntigo.setTelefone(funcionarioNovo.getTelefone());
        funcionarioAntigo.setEmail(funcionarioNovo.getEmail());
        funcionarioAntigo.setDataNascimento(funcionarioNovo.getDataNascimento());
        funcionarioAntigo.setDataAdmissao(funcionarioNovo.getDataAdmissao());
        funcionarioAntigo.setCargo(funcionarioNovo.getCargo());
        funcionarioAntigo.setStatus(funcionarioNovo.getStatus());

        return funcionarioRepository.save(funcionarioAntigo);
    }
}

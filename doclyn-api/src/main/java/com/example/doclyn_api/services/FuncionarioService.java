package com.example.doclyn_api.services;

import com.example.doclyn_api.dtos.FuncionarioRequestDTO;
import com.example.doclyn_api.exceptions.ResourceNotFound;
import com.example.doclyn_api.models.Funcionario;
import com.example.doclyn_api.repositories.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public List<Funcionario> findAll(String sortField, String sortDirection) {
        Sort sort = Sort.by(sortField);

        if (sortDirection.equals("desc")) {
            sort = sort.descending();
        }

        return funcionarioRepository.findAll(sort);
    }

    public Funcionario findById(Long id) {
        return funcionarioRepository.findById(id).orElseThrow(() -> new ResourceNotFound(
                "Nenhum funcionário com esse id foi encontrado!"
        ));
    }

    public Funcionario save(FuncionarioRequestDTO dto) {
        return funcionarioRepository.save(toEntity(dto));
    }

    public void deleteById(Long id) {
        if (!funcionarioRepository.existsById(id)) {
            throw new ResourceNotFound("Nenhum funcionário com esse id foi encontrado!");
        }

        funcionarioRepository.deleteById(id);
    }

    public Funcionario updateById(Long id, FuncionarioRequestDTO dto) {
        Funcionario funcionarioAntigo = findById(id);

        funcionarioAntigo.setNome(dto.nome());
        funcionarioAntigo.setCpf(dto.cpf());
        funcionarioAntigo.setTelefone(dto.telefone());
        funcionarioAntigo.setEmail(dto.email());
        funcionarioAntigo.setDataNascimento(dto.dataNascimento());
        funcionarioAntigo.setDataAdmissao(dto.dataAdmissao());
        funcionarioAntigo.setCargo(dto.cargo());
        funcionarioAntigo.setStatus(dto.status());

        return funcionarioRepository.save(funcionarioAntigo);
    }

    public Funcionario toEntity(FuncionarioRequestDTO dto) {
        return new Funcionario(
                dto.nome(),
                dto.cpf(),
                dto.telefone(),
                dto.email(),
                dto.dataNascimento(),
                dto.dataAdmissao(),
                dto.cargo(),
                dto.status()
        );
    }
}

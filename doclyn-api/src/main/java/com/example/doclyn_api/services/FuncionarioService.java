package com.example.doclyn_api.services;

import com.example.doclyn_api.dtos.FuncionarioRequestDTO;
import com.example.doclyn_api.exceptions.ResourceNotFound;
import com.example.doclyn_api.models.Funcionario;
import com.example.doclyn_api.repositories.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Page<Funcionario> findAll(String sortField, String sortDirection, int pageNumber, int pageSize) {
        Sort sortConfiguration = Sort.by(sortField);

        if (sortDirection.equals("desc")) {
            sortConfiguration = sortConfiguration.descending();
        }

        Pageable pageConfiguration = PageRequest.of(pageNumber, pageSize, sortConfiguration);

        return funcionarioRepository.findAll(pageConfiguration);
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

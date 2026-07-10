# Doclyn

**Versão:** 0.1.0

API REST para gestão de funcionários, construída com Spring Boot. O primeiro módulo disponível é o de **Funcionários**, com operações completas de CRUD e documentação interativa via Swagger/OpenAPI.

## Tecnologias

- **Java 26**
- **Spring Boot 4.1.0**
  - Spring Web MVC
  - Spring Data JPA
  - Spring Boot Validation
  - Spring Boot DevTools
- **PostgreSQL**
- **Lombok**
- **springdoc-openapi** 2.8.9 (Swagger UI)
- **Maven** (com wrapper `mvnw`)

## Estrutura do projeto

```
doclyn/
└── doclyn-api/
    └── src/main/java/com/example/doclyn_api/
        ├── controllers/   # Endpoints REST (FuncionarioController)
        ├── services/      # Regras de negócio (FuncionarioService)
        ├── repositories/  # Acesso a dados JPA (FuncionarioRepository)
        ├── models/        # Entidades (Funcionario)
        ├── enums/         # CargoEnum, StatusEnum
        ├── exceptions/    # ResourceNotFound
        └── handlers/      # GlobalExceptionHandler
```

## Pré-requisitos

- JDK 26
- PostgreSQL em execução
- (Opcional) Maven — o projeto já inclui o Maven Wrapper (`mvnw` / `mvnw.cmd`)

## Configuração

As configurações ficam em `doclyn-api/src/main/resources/application.properties`. Por padrão a aplicação espera um banco PostgreSQL local:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=admin
spring.jpa.hibernate.ddl-auto=update
```

Ajuste `url`, `username` e `password` de acordo com o seu ambiente. O esquema do banco é criado/atualizado automaticamente (`ddl-auto=update`).

## Como executar

A partir da pasta `doclyn-api`:

```bash
# Linux/macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

A aplicação sobe por padrão em `http://localhost:8080`.

### Documentação da API (Swagger)

Com a aplicação em execução, acesse:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Módulo de Funcionários

Recurso base: `/funcionarios`

| Método | Endpoint             | Descrição                       | Status de sucesso |
| ------ | -------------------- | ------------------------------- | ----------------- |
| GET    | `/funcionarios`      | Lista todos os funcionários     | 200 OK            |
| GET    | `/funcionarios/{id}` | Busca um funcionário por ID     | 200 OK            |
| POST   | `/funcionarios`      | Cria um novo funcionário        | 201 Created       |
| PUT    | `/funcionarios/{id}` | Atualiza um funcionário por ID  | 200 OK            |
| DELETE | `/funcionarios/{id}` | Remove um funcionário por ID    | 204 No Content    |

Quando um `id` não existe, a API retorna **404 Not Found** com uma mensagem descritiva, tratada por `GlobalExceptionHandler`.

### Modelo `Funcionario`

```json
{
  "id": 1,
  "nome": "João da Silva",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@example.com",
  "dataNascimento": "1990-05-20",
  "dataAdmissao": "2024-01-10",
  "cargo": "PEDREIRO",
  "status": "ATIVO"
}
```

### Valores de enum

- **Cargo** (`CargoEnum`): `OFICIAL`, `SERVENTE`, `AJUDANTE`, `ARMADOR`, `PEDREIRO`, `MEIO_OFICIAL`, `ELETRICISTA`
- **Status** (`StatusEnum`): `ATIVO`, `DESLIGADO`, `FERIAS`, `AFASTADO`

## Testes

A partir da pasta `doclyn-api`:

```bash
./mvnw test
```

## Roadmap

- [x] Módulo de Funcionários (CRUD)
- [ ] Autenticação e autorização (Spring Security — já preparado no `pom.xml`)
- [ ] Novos módulos de gestão

## Histórico de versões

### 0.1.0
- Módulo de Funcionários com CRUD completo
- Tratamento global de exceções (`404` para recurso não encontrado)
- Documentação interativa com Swagger/OpenAPI

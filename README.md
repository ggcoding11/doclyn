# Doclyn

<img width="1280" height="720" alt="Gravação-de-ecrã-2-_online-video-cutter com_-_1_" src="https://github.com/user-attachments/assets/841e9d30-3055-4673-8e17-dc5aab1d31d1" />

Sistema web para gestão de funcionários. O projeto é um monorepo com duas aplicações:

- **`doclyn-api`**: API REST em Spring Boot, com autenticação JWT e persistência em PostgreSQL.
- **`doclyn-web`**: painel administrativo em React que consome a API.

O primeiro módulo disponível é o de **Funcionários**: listagem paginada com busca e ordenação, cadastro, edição, visualização e exclusão.

```
┌──────────────────────┐   HTTP + JWT (Bearer)   ┌──────────────────────┐        ┌────────────┐
│  doclyn-web (React)  │ ──────────────────────▶ │ doclyn-api (Spring)  │ ─────▶ │ PostgreSQL │
│  localhost:8081      │                         │ localhost:8080       │        │            │
└──────────────────────┘                         └──────────────────────┘        └────────────┘
```

## Tecnologias

### Backend (`doclyn-api`)

- **Java 26**
- **Spring Boot 4.1.0**
  - Spring Web MVC
  - Spring Data JPA
  - Spring Security
  - Spring Boot Validation
  - Spring Boot DevTools
- **PostgreSQL**
- **java-jwt** 4.6.0 (Auth0): geração e validação de tokens JWT
- **Lombok**
- **springdoc-openapi** 2.8.9 (Swagger UI)
- **Maven**, com wrapper `mvnw`

### Frontend (`doclyn-web`)

- **React 19**
- **Vite 8**
- **React Router 7**
- **Tailwind CSS 4** + **DaisyUI 5**
- **Axios**
- **react-number-format**: máscaras de CPF e telefone nos formulários
- **react-icons**
- **Oxlint**: linter

## Estrutura do projeto

```
doclyn/
├── doclyn-api/
│   └── src/main/
│       ├── java/com/example/doclyn_api/
│       │   ├── config/        # SwaggerConfig (esquema Bearer JWT no Swagger)
│       │   ├── controllers/   # AuthController, FuncionarioController
│       │   ├── dtos/          # Records de entrada/saída com validações
│       │   ├── enums/         # CargoEnum, StatusEnum
│       │   ├── exceptions/    # ResourceNotFound, UserAlreadyExists
│       │   ├── handlers/      # GlobalExceptionHandler
│       │   ├── models/        # Entidades JPA: Funcionario, User
│       │   ├── repositories/  # FuncionarioRepository, UserRepository
│       │   ├── security/      # SecurityConfiguration, SecurityFilter (JWT)
│       │   └── services/      # AuthService, FuncionarioService, TokenService, UserService
│       └── resources/
│           └── application-example.properties
│
└── doclyn-web/
    ├── public/assets/         # Logos, favicon e imagem de fundo do login
    └── src/
        ├── components/        # Sidebar, FuncionarioForm, CargoSelect, StatusSelect
        ├── contexts/          # AuthContext (estado de autenticação)
        ├── pages/
        │   ├── auth/          # LoginPage
        │   ├── home/          # HomePage
        │   └── funcionarios/  # Listagem, detalhe, criação e edição
        ├── routes/            # ProtectedRoute, PublicRoute
        ├── services/          # api.jsx (instância Axios com o token)
        └── utils/             # Formatação de CPF, telefone e datas
```

## Pré-requisitos

- JDK 26
- Node.js e npm
- PostgreSQL em execução
- Maven é opcional, porque o projeto já inclui o Maven Wrapper (`mvnw` / `mvnw.cmd`)

## Configuração

### API

A API não tem um `application.properties` padrão. As configurações ficam em arquivos por profile do Spring, e só o modelo `application-example.properties` é versionado.

1. Copie `doclyn-api/src/main/resources/application-example.properties` para `application-dev.properties`, na mesma pasta.
2. Preencha os valores:

```properties
spring.application.name=doclyn-api
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=<usuario-do-banco>
spring.datasource.password=<senha-do-banco>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

api.security.token.secret-key=<chave-secreta-longa-e-aleatoria>
```

| Propriedade | Descrição |
| --- | --- |
| `spring.datasource.*` | Conexão com o PostgreSQL. |
| `spring.jpa.hibernate.ddl-auto=update` | Cria ou atualiza as tabelas (`TB_FUNCIONARIO`, `TB_USER`) automaticamente ao subir a aplicação. |
| `api.security.token.secret-key` | Chave usada para assinar e validar os tokens JWT (HMAC256). Trocá-la invalida todos os tokens já emitidos. |

Para gerar uma chave segura:

```bash
openssl rand -base64 64
```

> Os arquivos de configuração com credenciais reais não devem ser commitados. Versione só o `application-example.properties`.

### Web

O frontend lê a URL da API da variável `VITE_API_URL`. O arquivo `doclyn-web/.env.development` já aponta para a API local:

```env
VITE_API_URL=http://localhost:8080
```

Para outros ambientes, use o `.env.example` como modelo.

## Como executar

### 1. API

A partir da pasta `doclyn-api`, suba a aplicação com o profile `dev` ativo:

```bash
# Linux/macOS
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Windows
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

Outra opção é definir a variável de ambiente `SPRING_PROFILES_ACTIVE=dev`, ou configurar o profile na run configuration da sua IDE.

A API sobe em `http://localhost:8080`.

### 2. Web

A partir da pasta `doclyn-web`:

```bash
npm install
npm run dev
```

O painel sobe em `http://localhost:8081`.

> A API só aceita requisições (CORS) da origem `http://localhost:8081`. Se você mudar a porta do frontend, ajuste também o `corsConfigurationSource` em `SecurityConfiguration`.

### 3. Primeiro acesso

Ainda não existe uma tela de cadastro de usuários. Crie o primeiro usuário direto pela API, pelo Swagger ou com `curl`:

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"login": "admin", "password": "sua-senha"}'
```

Depois, entre no painel com esse login e senha.

## Autenticação

A API usa autenticação **stateless com JWT**:

1. `POST /auth/login` recebe login e senha. A senha é conferida com o hash **BCrypt** salvo no banco.
2. Se as credenciais estiverem corretas, a API devolve um token JWT assinado com HMAC256 (emissor `doclyn`), válido por **2 horas**.
3. As demais requisições precisam enviar o cabeçalho `Authorization: Bearer <token>`.
4. O `SecurityFilter` valida o token a cada requisição e carrega o usuário no contexto do Spring Security.

No frontend:

- O token é salvo no `localStorage` depois do login.
- A instância Axios (`src/services/api.jsx`) anexa o token automaticamente em todas as chamadas.
- Ao abrir o app, o `AuthContext` valida o token salvo via `POST /auth/validate`.
- `ProtectedRoute` redireciona para o login quem não está autenticado. `PublicRoute` redireciona para `/home` quem já está.

### Rotas públicas

| Rota | Método |
| --- | --- |
| `/auth/login` | POST |
| `/auth/register` | POST |
| `/auth/validate` | POST |
| `/swagger-ui.html`, `/swagger-ui/**`, `/v3/api-docs/**` | GET |

Todas as outras rotas exigem autenticação.

## Documentação da API (Swagger)

Com a API em execução:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

Para testar os endpoints protegidos pelo Swagger, faça login em `/auth/login`, copie o token, clique em **Authorize** e cole o token (sem o prefixo `Bearer`).

## Referência da API

### Autenticação: `/auth`

| Método | Endpoint | Corpo | Resposta de sucesso |
| --- | --- | --- | --- |
| POST | `/auth/register` | `{ "login": "...", "password": "..." }` | 200 OK, `"Usuário criado com sucesso!"` |
| POST | `/auth/login` | `{ "login": "...", "password": "..." }` | 200 OK, `{ "token": "..." }` |
| POST | `/auth/validate` | `{ "token": "..." }` | 200 OK, `"Token está válido!"` |

Os campos `login`, `password` e `token` são obrigatórios (não podem ser vazios).

### Funcionários: `/funcionarios`

| Método | Endpoint | Descrição | Status de sucesso |
| --- | --- | --- | --- |
| GET | `/funcionarios` | Lista funcionários com paginação, busca e ordenação | 200 OK |
| GET | `/funcionarios/{id}` | Busca um funcionário por ID | 200 OK |
| POST | `/funcionarios` | Cria um novo funcionário | 201 Created (com cabeçalho `Location`) |
| PUT | `/funcionarios/{id}` | Atualiza um funcionário por ID | 200 OK |
| DELETE | `/funcionarios/{id}` | Remove um funcionário por ID | 204 No Content |

#### Parâmetros de `GET /funcionarios`

| Parâmetro | Padrão | Descrição |
| --- | --- | --- |
| `searchParam` | — | Filtra pelo nome. A busca é parcial e ignora maiúsculas/minúsculas. |
| `sortField` | `id` | Campo usado na ordenação (ex.: `nome`, `cargo`, `dataAdmissao`). |
| `sortDirection` | `asc` | `asc` ou `desc`. |
| `pageNumber` | `0` | Número da página, começando em 0. |
| `pageSize` | `20` | Quantidade de itens por página. |

Exemplo:

```
GET /funcionarios?searchParam=silva&sortField=nome&sortDirection=desc&pageNumber=0&pageSize=10
```

A resposta segue o formato `Page` do Spring Data: os itens ficam em `content`, e os metadados aparecem em campos como `totalPages`, `totalElements` e `number`.

#### Corpo de criação/edição (`FuncionarioRequestDTO`)

```json
{
  "nome": "João da Silva",
  "cpf": "12345678900",
  "telefone": "11999999999",
  "email": "joao@example.com",
  "dataNascimento": "1990-05-20",
  "dataAdmissao": "2024-01-10",
  "cargo": "PEDREIRO",
  "status": "ATIVO"
}
```

| Campo | Regras |
| --- | --- |
| `nome` | Obrigatório. |
| `cpf` | Obrigatório. Exatamente 11 dígitos, sem pontuação. |
| `telefone` | Obrigatório. Exatamente 11 dígitos (DDD + número), sem pontuação. |
| `email` | Obrigatório. Formato de email válido. |
| `dataNascimento` | Obrigatória. Precisa ser uma data passada (`yyyy-MM-dd`). |
| `dataAdmissao` | Obrigatória. Hoje ou uma data passada (`yyyy-MM-dd`). |
| `cargo` | Obrigatório. Um dos valores de `CargoEnum`. |
| `status` | Obrigatório. Um dos valores de `StatusEnum`. |

> As validações do DTO só são aplicadas no `POST`. O `PUT /funcionarios/{id}` hoje não usa `@Valid` e aceita o corpo sem validar.

A resposta devolve o funcionário salvo, com o `id` gerado.

#### Valores de enum

- **Cargo** (`CargoEnum`): `OFICIAL`, `SERVENTE`, `AJUDANTE`, `ARMADOR`, `PEDREIRO`, `MEIO_OFICIAL`, `ELETRICISTA`
- **Status** (`StatusEnum`): `ATIVO`, `DESLIGADO`, `FERIAS`, `AFASTADO`

### Erros

| Situação | Status | Corpo |
| --- | --- | --- |
| Funcionário não encontrado | 404 Not Found | `"ERROR: Nenhum funcionário com esse id foi encontrado!"` |
| Login já cadastrado | 409 Conflict | `"ERROR: Usuário já cadastrado!"` |
| Corpo inválido (falha de validação) | 400 Bad Request | Resposta padrão do Spring |
| Requisição sem token em rota protegida | 403 Forbidden | — |

`ResourceNotFound` e `UserAlreadyExists` são tratadas centralmente pelo `GlobalExceptionHandler`.

> Token inválido ou expirado ainda não tem tratamento próprio. O `TokenService` lança uma `RuntimeException` genérica, que não passa pelo `GlobalExceptionHandler`, e a resposta não é um 401 padronizado.

## Frontend

### Páginas

| Rota | Página | Acesso |
| --- | --- | --- |
| `/` | Login | Pública |
| `/home` | Página inicial | Protegida |
| `/funcionarios` | Listagem de funcionários | Protegida |
| `/funcionarios/salvar` | Cadastro de funcionário | Protegida |
| `/funcionarios/:id` | Detalhes do funcionário | Protegida |
| `/funcionarios/editar/:id` | Edição do funcionário | Protegida |

### Funcionalidades

- **Login** com modal de aviso quando as credenciais são inválidas.
- **Sidebar** de navegação (Home e Funcionários), responsiva, que vira menu recolhível em telas pequenas.
- **Listagem de funcionários:**
  - tabela paginada (20 itens por página);
  - busca por nome;
  - ordenação crescente/decrescente clicando no cabeçalho das colunas;
  - ações de visualizar, editar e excluir em cada linha.
- **Exclusão** com modal de confirmação e modais de sucesso/erro.
- **Cadastro e edição** pelo mesmo formulário (`FuncionarioForm`), com máscaras de CPF e telefone, selects de cargo e status, e modais de sucesso/erro.
- **Detalhes do funcionário** com CPF, telefone e datas formatados no padrão brasileiro.

## Scripts

### API (`doclyn-api`)

| Comando | Descrição |
| --- | --- |
| `./mvnw spring-boot:run` | Sobe a API em modo de desenvolvimento |
| `./mvnw package` | Gera o `.jar` em `target/` |
| `./mvnw test` | Executa os testes |

### Web (`doclyn-web`)

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento do Vite (porta 8081) |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o Oxlint |

## Testes

O projeto ainda **não tem testes automatizados**. A pasta `doclyn-api/src/test` existe, mas está vazia. As dependências de teste do Spring Boot (JPA, Web MVC, Validation e Security) já estão declaradas no `pom.xml`.

## Roadmap

- [x] Módulo de Funcionários (CRUD)
- [x] Paginação, busca por nome e ordenação na listagem
- [x] Autenticação com JWT (Spring Security)
- [x] Painel web em React
- [ ] Logout no painel
- [ ] Testes automatizados
- [ ] Gestão de usuários pelo painel
- [ ] Novos módulos de gestão

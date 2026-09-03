
## CORS

Olá. Gostaria de te dizer que essa API possui CORS ativado para qualquer origem (*). Você pode acessá-la através de qualquer domínio sem configuração adicional no cliente.


# API do Portfolio de Joanna — Documentação de Endpoints

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

  ## Obra

    ### GET /alunos

    Lista todos os alunos

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

      ```json
        [
          {
            "id": 1,
            "nome": "Alana",
            "email": "ajro1@email.com",
            "cidade": "Salinas",
            "frase": "Abrace o mundo e você será abraçado.",
            "planosFuturos": "Cursar Biologia",
            "fotoUrl": null,
            "role": "USER",
            "criadoEm": "2026-04-03T10:30:00.000Z"
          },
          {
            "id": 2,
            "nome": "Amilton",
            "email": "apj1@email.com",
            "cidade": "Taiobeiras",
            "frase": "Nunca desistir.",
            "planosFuturos": "Cursar Matemática",
            "fotoUrl": null,
            "role": "USER",
            "criadoEm": "2026-04-04T01:40:00.000Z"
          }
        ]
      ```

    ### GET /alunos/:id

    Busca um aluno pelo ID

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

      ```json

      {
        "id": 1,
        "nome": "Alana",
        "email": "ajro1@email.com",
        "cidade": "Salinas",
        "frase": "Abrace o mundo e você será abraçado.",
        "planosFuturos": "Cursar Biologia",
        "fotoUrl": null,
        "role": "USER",
        "criadoEm": "2026-04-03T10:30:00.000Z"
      }

      ```

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

    ### PUT /alunos/:id

    Atualiza o próprio perfil

    - **Autenticação:** Sim (Bearer Token)

    - **Body:**

    ```json
    {
      "frase": "Abrace o mundo e você será pisoteado."
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Alana",
      "cidade": "Salinas",
      "frase": "Abrace o mundo e você será pisoteado.",
      "planosFuturos": "Cursar Química",
      "fotoUrl": null
    }
    ```

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

    ### DELETE /alunos/:id

    Remove um aluno   

    - **Autenticação:** Sim (Bearer Token - Admin)
    - **Body:** Nenhum

    - **Resposta de Sucesso:** `204 No Content`

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

  ## Artista

    ### GET /alunos

    Lista todos os alunos

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

      ```json
        [
          {
            "id": 1,
            "nome": "Alana",
            "email": "ajro1@email.com",
            "cidade": "Salinas",
            "frase": "Abrace o mundo e você será abraçado.",
            "planosFuturos": "Cursar Biologia",
            "fotoUrl": null,
            "role": "USER",
            "criadoEm": "2026-04-03T10:30:00.000Z"
          },
          {
            "id": 2,
            "nome": "Amilton",
            "email": "apj1@email.com",
            "cidade": "Taiobeiras",
            "frase": "Nunca desistir.",
            "planosFuturos": "Cursar Matemática",
            "fotoUrl": null,
            "role": "USER",
            "criadoEm": "2026-04-04T01:40:00.000Z"
          }
        ]
      ```

    ### GET /alunos/:id

    Busca um aluno pelo ID

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

      ```json

      {
        "id": 1,
        "nome": "Alana",
        "email": "ajro1@email.com",
        "cidade": "Salinas",
        "frase": "Abrace o mundo e você será abraçado.",
        "planosFuturos": "Cursar Biologia",
        "fotoUrl": null,
        "role": "USER",
        "criadoEm": "2026-04-03T10:30:00.000Z"
      }

      ```

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

    ### PUT /alunos/:id

    Atualiza o próprio perfil

    - **Autenticação:** Sim (Bearer Token)

    - **Body:**

    ```json
    {
      "frase": "Abrace o mundo e você será pisoteado."
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Alana",
      "cidade": "Salinas",
      "frase": "Abrace o mundo e você será pisoteado.",
      "planosFuturos": "Cursar Química",
      "fotoUrl": null
    }
    ```

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

    ### DELETE /alunos/:id

    Remove um aluno   

    - **Autenticação:** Sim (Bearer Token - Admin)
    - **Body:** Nenhum

    - **Resposta de Sucesso:** `204 No Content`

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor
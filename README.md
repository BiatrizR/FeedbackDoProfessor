# ✨ Sistema de Feedback de Alunos

<p align="center">
  <strong>Uma maneira simples, visual e interativa de compartilhar o desenvolvimento dos alunos!</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

---

## 📚 Sobre o projeto

O **Sistema de Feedback de Alunos** é uma aplicação web desenvolvida para facilitar a criação e o compartilhamento de avaliações individuais.

A plataforma permite que o professor registre o desempenho dos alunos, avalie habilidades, escreva comentários personalizados e compartilhe projetos desenvolvidos durante as aulas.

Cada feedback recebe um link exclusivo, permitindo que os responsáveis visualizem o relatório de maneira simples e prática.

## 🚀 Funcionalidades

- 📝 Cadastro do nome do aluno.
- ⭐ Avaliação de três habilidades por meio de estrelas.
- 💬 Campo para comentários personalizados do professor.
- 🔗 Adição de links dos projetos desenvolvidos.
- 🖼️ Upload de imagens dos projetos.
- 🔐 Armazenamento de dados utilizando Supabase.
- 🌐 Geração de links individuais para compartilhamento.
- 🎉 Animação de confetes ao visualizar o feedback.
- 🎬 Elementos animados para uma experiência mais interativa.

## 🛠️ Tecnologias utilizadas

| Tecnologia   | Aplicação                                 |
| ------------ | ----------------------------------------- |
| HTML5        | Estrutura das páginas                     |
| CSS3         | Estilização e responsividade              |
| JavaScript   | Lógica e interatividade                   |
| Supabase     | Banco de dados e armazenamento de imagens |
| GitHub Pages | Hospedagem da aplicação                   |

## 📂 Estrutura do projeto

```text
feedback-alunos/
│
├── index.html
├── formulario.html
├── script.js
├── styleForm.css
│
├── midia/
│   ├── Feedback.mp4
│   └── FinalFeedback.mp4
│
└── README.md
```

## ⚙️ Como executar o projeto

1. Faça o clone do repositório:

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

2. Abra a pasta do projeto no VS Code.

3. Configure as credenciais públicas do seu projeto Supabase no arquivo `script.js`.

4. Configure as tabelas, funções RPC, políticas de acesso e o bucket de armazenamento no Supabase.

5. Execute o projeto utilizando a extensão Live Server ou outra hospedagem estática.

## ☁️ Publicação

O projeto pode ser publicado gratuitamente utilizando o **GitHub Pages**.

Para habilitar:

1. Acesse as configurações do repositório no GitHub.
2. Entre na opção **Pages**.
3. Em _Build and deployment_, selecione `Deploy from a branch`.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve as configurações.

Após a publicação, o GitHub disponibilizará um endereço para acessar a aplicação.

## 🔒 Segurança

Este projeto utiliza uma chave pública do Supabase (`sb_publishable_`) para realizar a conexão pelo navegador.

**Importante:** chaves secretas e chaves `service_role` nunca devem ser incluídas no código do frontend.

As permissões de acesso devem ser controladas por meio das políticas RLS do Supabase, das permissões do Storage e das funções do banco de dados.

## 💡 Objetivo

Este projeto nasceu da ideia de tornar o acompanhamento pedagógico mais acessível, organizado e interativo, aproximando professores, alunos e responsáveis por meio da tecnologia.

---

<p align="center">
  Desenvolvido com 💙 e tecnologia.
</p>

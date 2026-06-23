# 📒 Projeto Anotaí

Aplicação desenvolvida em **React Native** com integração de API em **Spring Boot** e banco de dados **PostgreSQL**.  
O objetivo é permitir cadastro de usuários, autenticação e gerenciamento de notas pessoais.

---

## 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados relacional.  
Abaixo estão as tabelas principais:

sql
CREATE TABLE usuario (
    id_usuario    SERIAL PRIMARY KEY,
    login         VARCHAR(100) NOT NULL UNIQUE,
    senha_usuario VARCHAR(255) NOT NULL,
    role          VARCHAR(20) CHECK (role IN ('USER', 'ADMIN')),
    idioma        VARCHAR(50) NOT NULL
);

CREATE TABLE bloco (
    id_bloco   SERIAL PRIMARY KEY,
    texto      VARCHAR(100) NOT NULL,
    id_usuario INTEGER NOT NULL,
    cor        VARCHAR(100) NOT NULL,
    CONSTRAINT fk_bloco_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE
);

CREATE INDEX idx_bloco_usuario ON bloco(id_usuario);

## 🔑 Autenticação  A API possui endpoints para autenticação e cadastro de usuários:

Cadastro de usuário

POST /usuarios/cadastro

Body:

json
{
  "login": "email@dominio.com",
  "senha": "123456",
  "role": "USER"
}

Login de usuário

POST /usuarios/login

Body:

json
{
  "login": "email@dominio.com",
  "senha": "123456",
  "role": "USER"
}
Resposta:

json
{
  "token": "Bearer <JWT>",
  "idUsuario": 1,
  "login": "email@dominio.com"
}

## 📱 Download do APK

Você pode baixar a versão antiga do aplicativo aqui:  
[⬇️ Baixar APK](https://expo.dev/accounts/jpmazzotti/projects/trabalhoFinal/builds/8396d482-5d8e-482c-80c9-c3d688a4c27e)

Você pode baixar a versão nova do aplicativo aqui: 
[⬇️ Baixar APK](https://expo.dev/accounts/jpmazzotti/projects/trabalhoFinal/builds/48b9d045-0367-4c5f-8da1-dc641dadde12)




👥 Participantes
Emily Neves;

João Pedro Mazzotti de Almeida Ricken;

João Gabriel Farias



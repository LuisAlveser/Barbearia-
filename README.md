# ✂️ Corte Já - Sistema de Agendamento de Barbearia

O **Corte Já** é uma aplicação Full Stack moderna desenvolvida para conectar clientes a barbeiros de forma eficiente. O sistema permite a gestão completa de perfis, cadastro de serviços personalizados e um fluxo de agendamento intuitivo em tempo real.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
* **React.js**: Biblioteca principal para construção de interfaces dinâmicas.
* **React Router Dom**: Gerenciamento de rotas e navegação SPA.
* **Axios**: Cliente HTTP para consumo da API REST.
* **Zod & React Hook Form**: Validação robusta de formulários e schemas.
* **React Icons**: Conjunto de ícones para melhor experiência visual.

### **Backend**
* **Node.js**: Ambiente de execução Javascript escalável.
* **Express**: Framework minimalista para construção da API.
* **PostgreSQL**: Banco de dados relacional para persistência de dados.
* **Sequelize**: ORM para mapeamento e manipulação de dados.
* **JWT (JSON Web Token)**: Autenticação segura e controle de acesso.
* **Jest**: Framework de testes para garantir a qualidade do código.

---

## 🛠️ Funcionalidades principais

* **Autenticação**: Cadastro e Login de usuários com diferenciação de permissões (**CLIENTE** e **BARBEIRO**).
* **Perfil do Barbeiro**: Visualização de biografia e lista de serviços oferecidos com preços.
* **Gestão de Serviços**: Barbeiros possuem autonomia para cadastrar, editar e excluir seus tipos de corte.
* **Agendamentos**: Sistema de reserva de horários com feedback visual de cancelamento.
* **Segurança**: Proteção de rotas sensíveis utilizando middlewares de autenticação via Token.


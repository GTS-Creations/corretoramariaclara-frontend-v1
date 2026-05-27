# Corretora Maria Clara

Interface web moderna e responsiva para gerenciamento e venda de propriedades, integrada via API REST.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** Framework React com suporte a Server Components, SSR e otimização de performance.

- **TypeScript** Tipagem estática para maior segurança no consumo de dados e manutenção do código.

- **Tailwind CSS** Estilização baseada em utilitários para criação de interfaces rápidas e consistentes.

- **Shadcn UI** Biblioteca de componentes acessíveis e altamente customizáveis.

- **Lucide React** Ícones modernos e leves.

- **React Icons** Conjunto adicional de ícones para maior flexibilidade na UI.

---

## 📋 Pré-requisitos

Antes de iniciar o desenvolvimento, você precisa ter instalado:

- **Node.js 18+**
- **NPM**

---

## ⚙️ Configuração do Ambiente

O projeto utiliza variáveis de ambiente para se comunicar com a API.

Crie um arquivo .env na raiz do projeto e adicione:

| Variável              | Descrição                      |
| :-------------------- | :----------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API (backend REST) |

> ⚠️ No Next.js, apenas variáveis com prefixo NEXT*PUBLIC* ficam disponíveis no navegador.

---

## 🖥️ Funcionalidades Implementadas

- **🏠 Gerenciamento de imóveis (CRUD)** – Cadastro, edição, listagem e remoção de propriedades.
- **🔎 Busca e filtros de imóveis** – Pesquisa por localização, preço e características.
- **📄 Detalhes do imóvel** – Página dedicada com informações completas.
- **📱 Design responsivo** – Interface adaptada para mobile, tablet e desktop.
- **📤 Integração com API REST** – Consumo dinâmico de dados do backend.
- **💬 Compartilhamento via WhatsApp** – Geração de mensagens automáticas para contato.

---

## 📂 Estrutura de Pastas

```text
├── app/           # Rotas e páginas (Next.js App Router)
├── components/    # Componentes reutilizáveis de UI
├── hooks/         # Hooks personalizados
├── interfaces/    # Tipagens TypeScript
├── lib/           # Utilitários e helpers
├── providers/     # Contextos e provedores globais
├── public/        # Arquivos estáticos
├── schemas/       # Validações (ex: Zod)
├── services/      # Integração com API
├── utils/         # Funções auxiliares
└── middleware.ts  # Regras de middleware do Next.js
```

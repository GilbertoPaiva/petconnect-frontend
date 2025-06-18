# 🐾 Pet Connect - Frontend

Frontend moderno para a plataforma Pet Connect, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** - React framework com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI modernos
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de esquemas
- **Lucide React** - Ícones modernos

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** adaptada para frontend:

```
src/
├── app/                    # App Router Next.js 14
│   ├── (auth)/            # Grupo de rotas de autenticação
│   ├── admin/             # Dashboard administrativo
│   ├── lojista/           # Dashboard do lojista
│   ├── veterinario/       # Dashboard do veterinário
│   └── tutor/             # Dashboard do tutor
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes base (shadcn/ui)
├── domain/               # Entidades e tipos de negócio
│   ├── entities/         # Modelos de dados
│   └── types/           # Definições de tipos
├── infrastructure/       # Adapters externos
│   ├── api/             # Serviços de API
│   └── storage/         # Armazenamento local
├── application/          # Lógica de aplicação
│   ├── stores/          # Stores Zustand
│   ├── services/        # Serviços de negócio
│   └── usecases/        # Casos de uso
└── shared/              # Utilitários compartilhados
    ├── utils/           # Funções utilitárias
    ├── hooks/           # Hooks customizados
    └── constants/       # Constantes da aplicação
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Página de login responsiva
- [x] Registro por tipo de usuário
- [x] Validação de formulários
- [x] Gerenciamento de estado de autenticação

### ✅ Dashboards por Perfil
- [x] **Tutor**: Busca de produtos e serviços
- [ ] **Lojista**: CRUD de produtos
- [ ] **Veterinário**: CRUD de serviços
- [ ] **Admin**: Gestão de usuários

### ✅ Interface
- [x] Landing page moderna
- [x] Design responsivo
- [x] Componentes reutilizáveis
- [x] Sistema de cores consistente

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd petconnect-frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Linting com ESLint
npm run type-check   # Verificação de tipos
```

## 🌐 Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=Pet Connect
```

## 📱 Páginas Principais

### Públicas
- `/` - Landing page
- `/login` - Página de login
- `/register` - Página de registro

### Privadas (requer autenticação)
- `/tutor/dashboard` - Dashboard do tutor
- `/lojista/dashboard` - Dashboard do lojista
- `/veterinario/dashboard` - Dashboard do veterinário
- `/admin/dashboard` - Dashboard administrativo

## 🎨 Design System

### Cores Principais
- **Primary**: Blue 600 (#2563eb)
- **Secondary**: Gray 600 (#4b5563)
- **Success**: Green 600 (#059669)
- **Warning**: Yellow 600 (#d97706)
- **Error**: Red 600 (#dc2626)

### Tipografia
- **Fonte Principal**: Inter
- **Fonte Mono**: JetBrains Mono

## 🔧 Configuração do Backend

O frontend se conecta com a API REST do backend Pet Connect:
- **URL Base**: `http://localhost:8080`
- **Documentação**: Veja o README do backend

## 📦 Próximas Implementações

### 🎯 Funcionalidades Prioritárias
- [ ] Dashboards específicos para cada tipo de usuário
- [ ] Sistema de upload de imagens
- [ ] Filtros avançados de busca
- [ ] Sistema de favoritos
- [ ] Chat em tempo real
- [ ] Notificações push

### 🔧 Melhorias Técnicas
- [ ] Testes unitários com Jest
- [ ] Testes E2E com Playwright
- [ ] Storybook para componentes
- [ ] Internacionalização (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Otimização de performance

## 👥 Estrutura de Usuários

### Tutor (Pet Owner)
- Busca produtos e serviços
- Visualiza detalhes e avaliações
- Agenda consultas veterinárias

### Lojista (Store Owner)
- Gerencia catálogo de produtos
- Visualiza estatísticas de vendas
- Controla estoque

### Veterinário
- Gerencia serviços oferecidos
- Agenda consultas
- Visualiza histórico de pacientes

### Administrador
- Supervisiona toda a plataforma
- Gerencia usuários
- Visualiza métricas globais

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- 📧 Email: suporte@petconnect.com
- 💬 Chat: Disponível na plataforma
- 📖 Documentação: [docs.petconnect.com](https://docs.petconnect.com)

---

Desenvolvido com ❤️ para o mundo pet 🐾

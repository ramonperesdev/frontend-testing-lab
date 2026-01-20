# Frontend Testing Lab

Repositório de estudos sobre testes em aplicações React com TypeScript.

## 🚀 Tecnologias

### Produção
- React 18
- TypeScript
- Vite

### Testes
- **Vitest** - Test runner
- **React Testing Library** - Testes de componentes
- **MSW (Mock Service Worker)** - Mock de APIs
- **Happy-DOM** - Ambiente DOM
- **@testing-library/jest-dom** - Matchers customizados

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev      
npm run build   
npm run test    
```

## 🧪 Testes Implementados

### ✅ Testes Unitários
- **Funções puras** (`utils/date`) - Formatação de datas
- **Hooks** (`useCounter`) - Estado e ações

### ✅ Testes de Componentes
- **UserCard** - Renderização, estados, interações

### ✅ Testes de Integração
- **API + MSW** - Requisições HTTP mockadas
- **Componentes + Filhos** - UserCard + Avatar
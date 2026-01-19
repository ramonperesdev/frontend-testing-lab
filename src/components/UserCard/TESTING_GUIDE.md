# Guia de Testes - UserCard

Este componente foi criado para você praticar testes de componentes React!

## 📋 O que o componente faz?

O `UserCard` exibe informações de um usuário com 4 estados possíveis:

1. **Loading** - `isLoading={true}`
2. **Error** - `error="mensagem de erro"`
3. **Empty** - `user={null}`
4. **Success** - `user={mockUser}`

## 🎯 O que você deve testar?

### 1. Renderização Condicional

```typescript
describe('Renderização Condicional', () => {
  it('deve mostrar loading quando isLoading=true')
  it('deve mostrar erro quando error existe')
  it('deve mostrar empty state quando user=null')
  it('deve mostrar dados do usuário quando user existe')
})
```

### 2. Conteúdo Renderizado

```typescript
describe('Conteúdo', () => {
  it('deve renderizar nome do usuário')
  it('deve renderizar email do usuário')
  it('deve renderizar avatar com src e alt corretos')
  it('deve renderizar role quando existe')
  it('não deve renderizar role quando não existe')
})
```

### 3. Botões e Interações

```typescript
describe('Interações', () => {
  it('deve mostrar botão Editar quando onEdit é passado')
  it('deve mostrar botão Deletar quando onDelete é passado')
  it('não deve mostrar botões quando callbacks não são passados')
  it('deve chamar onEdit com userId correto ao clicar em Editar')
  it('deve chamar onDelete com userId correto ao clicar em Deletar')
})
```

### 4. Acessibilidade

```typescript
describe('Acessibilidade', () => {
  it('erro deve ter role="alert"')
  it('loading deve ter role="status"')
  it('nome deve estar em heading (h2)')
  it('botões devem ter aria-label descritivo')
  it('avatar deve ter alt text')
})
```

## 🔧 Query Methods Úteis

### Para elementos que DEVEM existir:
- `screen.getByRole()` - melhor para acessibilidade
- `screen.getByText()` - para textos
- `screen.getByTestId()` - quando não há alternativa melhor

### Para elementos que PODEM NÃO existir:
- `screen.queryByRole()` - retorna null se não encontrar
- `screen.queryByText()`

### Para elementos assíncronos:
- `await screen.findByRole()` - espera elemento aparecer

## 💡 Dados de Teste

```typescript
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'Developer'
};
```

## 🎨 Matchers Úteis

```typescript
// Elemento existe
expect(element).toBeInTheDocument()

// Atributos
expect(img).toHaveAttribute('src', 'url')
expect(img).toHaveAttribute('alt', 'nome')

// Funções mockadas
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith('1')
expect(mockFn).toHaveBeenCalledTimes(1)

// Elemento não existe
expect(screen.queryByText('texto')).not.toBeInTheDocument()
```

## 🚀 Exemplo Completo

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: 'https://example.com/avatar.jpg',
    role: 'Developer'
  };

  describe('Renderização Condicional', () => {
    it('deve mostrar loading quando isLoading=true', () => {
      render(<UserCard user={null} isLoading={true} />);
      
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    // ... mais testes aqui
  });

  describe('Interações', () => {
    it('deve chamar onEdit ao clicar no botão', () => {
      const onEditMock = vi.fn();
      
      render(<UserCard user={mockUser} onEdit={onEditMock} />);
      
      const editButton = screen.getByRole('button', { name: /editar/i });
      fireEvent.click(editButton);
      
      expect(onEditMock).toHaveBeenCalledWith('1');
    });
  });
});
```

## ✅ Checklist

- [ ] Todos os 4 estados renderizam corretamente
- [ ] Dados do usuário aparecem quando fornecidos
- [ ] Role é opcional e renderiza condicionalmente
- [ ] Botões aparecem apenas quando callbacks são passados
- [ ] Callbacks são chamados com parâmetros corretos
- [ ] Elementos têm roles de acessibilidade corretos
- [ ] Avatar tem src e alt corretos
- [ ] Não há erros de lint

## 🎓 Dicas

1. **Comece pelos testes mais simples** - empty state, loading
2. **Use `getByRole` sempre que possível** - melhor para acessibilidade
3. **Mock funções com `vi.fn()`** - para testar callbacks
4. **Use `data-testid` como último recurso** - prefira roles e texto
5. **Teste o comportamento, não a implementação** - usuário não sabe de CSS classes

Bora codar! 🚀

import { useState } from 'react'
import './App.css'
import { UserCard, User } from './components/UserCard'

const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
  role: 'Developer'
}

function App() {
  const [selectedState, setSelectedState] = useState<'loading' | 'error' | 'empty' | 'success'>('success')

  const handleEdit = (userId: string) => {
    alert(`Editar usuário: ${userId}`)
  }

  const handleDelete = (userId: string) => {
    alert(`Deletar usuário: ${userId}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Testing Lab</h1>
        <p>Exemplos do componente UserCard</p>
        
        <div className="controls">
          <button onClick={() => setSelectedState('loading')}>Loading</button>
          <button onClick={() => setSelectedState('error')}>Error</button>
          <button onClick={() => setSelectedState('empty')}>Empty</button>
          <button onClick={() => setSelectedState('success')}>Success</button>
        </div>

        <div className="card">
          {selectedState === 'loading' && (
            <UserCard user={null} isLoading={true} />
          )}
          
          {selectedState === 'error' && (
            <UserCard user={null} error="Erro ao carregar usuário" />
          )}
          
          {selectedState === 'empty' && (
            <UserCard user={null} />
          )}
          
          {selectedState === 'success' && (
            <UserCard 
              user={mockUser} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </header>
    </div>
  )
}

export default App

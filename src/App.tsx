import { useState } from 'react';
import './App.css'
import { UserCard } from './components/UserCard'

function App() {
  const [user, setUser] = useState('1');
  const [editMessage, setEditMessage] = useState<string | null>(null);

  const handleEdit = (userId: string) => {
    setEditMessage(`Editado usuário: ${userId}`);
  }

  const handleDelete = (userId: string) => {
    alert(`Deletar usuário: ${userId}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Testing Lab</h1>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setUser('1')}>User 1</button>
          <button onClick={() => setUser('2')}>User 2</button>
        </div>

        <div className="card">
          <UserCard 
            userId={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {editMessage && <p>{editMessage}</p>}
      </header>
    </div>
  )
}

export default App

import './App.css'
import { UserCard } from './components/UserCard'

function App() {
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

        <div className="card">
          <UserCard 
            userId="1"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </header>
    </div>
  )
}

export default App

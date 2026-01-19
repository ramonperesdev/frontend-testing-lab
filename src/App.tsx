import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Testing Lab</h1>
        <p>Repositório de estudos sobre testes em React</p>
        <div className="card">
          <button onClick={() => setCount((count: number) => count + 1)}>
            Contador: {count}
          </button>
        </div>
      </header>
    </div>
  )
}

export default App

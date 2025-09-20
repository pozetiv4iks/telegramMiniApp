import React from 'react'
import TestComponent from './TestComponent'
import './App.css'

function App() {
  return (
    <div className="app">
      <TestComponent />
      <div style={{ padding: '20px' }}>
        <h2>Базовая проверка</h2>
        <p>Если вы видите этот текст, значит приложение работает!</p>
        <button onClick={() => alert('Кнопка работает!')}>
          Тест кнопки
        </button>
      </div>
    </div>
  )
}

export default App

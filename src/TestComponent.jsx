import React from 'react'

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      margin: '20px',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h1>Тестовый компонент работает!</h1>
      <p>Если вы видите этот текст, значит React работает корректно.</p>
      <p>Время: {new Date().toLocaleString()}</p>
    </div>
  )
}

export default TestComponent

import './App.css'

function App() {
  console.log('App component rendered!')

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '20px',
          fontSize: '2rem'
        }}>
          🎉 Telegram Mini App
        </h1>
        
        <p style={{ 
          color: '#666', 
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          Приложение работает!
        </p>
        
        <button 
          onClick={() => alert('Кнопка работает!')}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#5a6fd8'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#667eea'}
        >
          Тестовая кнопка
        </button>
        
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '10px' 
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Статус:</h3>
          <p style={{ color: '#28a745', margin: '5px 0' }}>✅ React работает</p>
          <p style={{ color: '#28a745', margin: '5px 0' }}>✅ TypeScript работает</p>
          <p style={{ color: '#28a745', margin: '5px 0' }}>✅ Vite работает</p>
          <p style={{ color: '#28a745', margin: '5px 0' }}>✅ Стили работают</p>
        </div>
      </div>
    </div>
  )
}

export default App

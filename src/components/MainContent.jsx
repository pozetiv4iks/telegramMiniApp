import React, { useState } from 'react'
import { WebApp } from '@twa-dev/sdk'
import './MainContent.css'

const MainContent = ({ user }) => {
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState('')

  const handleIncrement = () => {
    setCounter(prev => prev + 1)
    WebApp.HapticFeedback.impactOccurred('medium')
  }

  const handleDecrement = () => {
    setCounter(prev => prev - 1)
    WebApp.HapticFeedback.impactOccurred('light')
  }

  const handleShowAlert = () => {
    WebApp.showAlert('Привет из Telegram Mini App!')
    WebApp.HapticFeedback.notificationOccurred('success')
  }

  const handleShowConfirm = () => {
    WebApp.showConfirm('Вы уверены?', (confirmed) => {
      if (confirmed) {
        WebApp.showAlert('Подтверждено!')
      }
    })
  }

  const handleSendData = () => {
    if (message.trim()) {
      WebApp.sendData(JSON.stringify({
        type: 'message',
        text: message,
        timestamp: Date.now()
      }))
      setMessage('')
      WebApp.showAlert('Данные отправлены!')
    }
  }

  const handleOpenLink = () => {
    WebApp.openLink('https://telegram.org')
  }

  return (
    <main className="main-content">
      <div className="content-container">
        <h1>Добро пожаловать в Mini App!</h1>
        
        {user && (
          <div className="welcome-section">
            <p>Привет, <strong>{user.first_name}</strong>!</p>
            <p>Ваш ID: <code>{user.id}</code></p>
          </div>
        )}

        <div className="counter-section">
          <h3>Счетчик</h3>
          <div className="counter-display">
            <button onClick={handleDecrement} className="counter-btn">-</button>
            <span className="counter-value">{counter}</span>
            <button onClick={handleIncrement} className="counter-btn">+</button>
          </div>
        </div>

        <div className="actions-section">
          <h3>Действия</h3>
          <div className="action-buttons">
            <button onClick={handleShowAlert} className="action-btn">
              Показать Alert
            </button>
            <button onClick={handleShowConfirm} className="action-btn">
              Показать Confirm
            </button>
            <button onClick={handleOpenLink} className="action-btn">
              Открыть ссылку
            </button>
          </div>
        </div>

        <div className="data-section">
          <h3>Отправка данных</h3>
          <div className="data-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="message-input"
            />
            <button 
              onClick={handleSendData}
              className="send-btn"
              disabled={!message.trim()}
            >
              Отправить
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3>Информация о WebApp</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Версия:</strong> {WebApp.version}
            </div>
            <div className="info-item">
              <strong>Платформа:</strong> {WebApp.platform}
            </div>
            <div className="info-item">
              <strong>Тема:</strong> {WebApp.colorScheme}
            </div>
            <div className="info-item">
              <strong>Язык:</strong> {WebApp.initDataUnsafe?.user?.language_code || 'ru'}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainContent

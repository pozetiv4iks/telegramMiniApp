import React from 'react'
import { WebApp } from '@twa-dev/sdk'
import './Footer.css'

const Footer = () => {
  const handleClose = () => {
    WebApp.close()
  }

  const handleMainButton = () => {
    WebApp.MainButton.setText('Готово!')
    WebApp.MainButton.show()
    WebApp.MainButton.onClick(() => {
      WebApp.showAlert('Главная кнопка нажата!')
    })
  }

  const handleHideMainButton = () => {
    WebApp.MainButton.hide()
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-buttons">
          <button onClick={handleMainButton} className="footer-btn">
            Показать главную кнопку
          </button>
          <button onClick={handleHideMainButton} className="footer-btn">
            Скрыть главную кнопку
          </button>
          <button onClick={handleClose} className="footer-btn close-btn">
            Закрыть приложение
          </button>
        </div>
        <div className="footer-info">
          <p>Telegram Mini App v1.0</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

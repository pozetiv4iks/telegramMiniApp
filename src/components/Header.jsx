import React from 'react'
import { WebApp } from '@twa-dev/sdk'
import './Header.css'

const Header = ({ user }) => {
  const handleBackClick = () => {
    WebApp.BackButton.onClick(() => {
      WebApp.close()
    })
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="user-info">
          {user && (
            <>
              <img 
                src={user.photo_url} 
                alt="User Avatar" 
                className="user-avatar"
              />
              <div className="user-details">
                <h2 className="user-name">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="user-username">@{user.username}</p>
              </div>
            </>
          )}
        </div>
        <button 
          className="back-button"
          onClick={handleBackClick}
        >
          ← Назад
        </button>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RouteTest = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const routes = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/transactions', name: 'Transactions' },
    { path: '/transfer', name: 'Transfer' },
    { path: '/profile', name: 'Profile' },
    { path: '/settings', name: 'Settings' },
    { path: '/cards', name: 'Cards' },
    { path: '/analytics', name: 'Analytics' },
    { path: '/support', name: 'Support' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-4">Тест роутинга</h1>
        
        <div className="mb-4">
          <p className="text-gray-300">Текущий путь:</p>
          <p className="text-blue-400 font-mono text-lg">{location.pathname}</p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-300 mb-2">Навигация:</p>
          {routes.map((route) => (
            <button
              key={route.path}
              onClick={() => {
                console.log(`Navigating to: ${route.path}`)
                navigate(route.path)
              }}
              className={`w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                location.pathname === route.path
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {route.name} ({route.path})
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm">
            Откройте консоль браузера (F12) чтобы увидеть логи навигации
          </p>
        </div>
      </div>
    </div>
  )
}

export default RouteTest

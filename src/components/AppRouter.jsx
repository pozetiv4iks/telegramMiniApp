import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ChooseCard from './ChooseCard'
import Dashboard from './Dashboard'
import Transactions from './Transactions'
import Transfer from './Transfer'
import Profile from './Profile'
import Settings from './Settings'
import Cards from './Cards'
import Analytics from './Analytics'
import Support from './Support'
import RouteTest from './RouteTest'
import BottomNavigation from './BottomNavigation'

const AppRouter = ({ user }) => {
  console.log('AppRouter rendered with user:', user)
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Navigate to="/choose-card" replace />} />
          <Route path="/choose-card" element={<ChooseCard />} />
          <Route path="/test" element={<RouteTest />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  )
}

export default AppRouter

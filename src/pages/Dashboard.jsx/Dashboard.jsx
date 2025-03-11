import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Dashboard() {
    const {user} = useAuth();
 
  return (
    <div>
        <h1>Welcome to the dashboard, {user?.email}</h1>
    </div>
  )
}

export default Dashboard
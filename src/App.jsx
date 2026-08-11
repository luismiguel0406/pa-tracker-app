import { useEffect, useState } from 'react'
import Navbar from './components/shared/Navbar.jsx'
import { Outlet } from 'react-router'
import './App.css';


function App() {
  const [userOnline, setUserOnline] = useState("")

  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem("player_data"))
    setUserOnline(userData?.tag)
  })

  return (
    <>
      <div className="app-shell">
        <header className="app-header">
          <Navbar />
        </header>

        {/* Área de Contenido Principal */}
          <main className="app-content">
            <Outlet />
          </main>
          {/* Footer Táctico */}
          <footer className="app-footer">
            <div className="footer-container geist-mono">
              <span>RANKING SYSTEM v1.0</span>
              {
               userOnline && <span className="footer-status">{`● ${userOnline} IS ONLINE`}</span>
              }
            </div>
          </footer>
      </div>
    </>
  )
}

export default App;

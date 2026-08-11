import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosClient } from '../../api/axiosClient';
import "./LoginStyle.css"

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Ajusta el endpoint según tu API de Django (ej. /api/token/ o /api/auth/login/)
      const response = await axiosClient.post('/login/', credentials);
      
      // Guardar token de acceso
      localStorage.setItem('pacademy_token', response.data.token || response.data.access);
      localStorage.setItem("player_data", JSON.stringify(response.data.player))
      
      // Redirigir a los retos o dashboard
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas. Verifica tu usuario y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <span className="geist-mono text-gold">INICIA SESION</span>
            <div>
              <img src="/logo.png" alt="logo academy" className="login-logo" width="100" />
            </div>
          </div>

          {error && <div className="error-banner geist-mono">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="geist-mono">USUARIO / GAMERTAG</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Ej. VNG_Shadow"
              />
            </div>

            <div className="form-group">
              <label className="geist-mono">CONTRASEÑA</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'AUTENTICANDO...' : 'INGRESAR'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axiosClient';
import playerStyleCSS from './PlayerStyle.js';
import { useParams } from 'react-router';


const Player = ({ onChallengeSuccess }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useState(localStorage.getItem('pacademy_token'));
  let { playerId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/players/${playerId}/`);
        setPlayer(response.data);
      } catch (err) {
        setError('No se pudo cargar el perfil del jugador.');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchProfile();
    }
  }, [playerId]);

  const handleChallenge = async () => {
    if (!player) return;
    try {
      const matchDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await axiosClient.post('/challenges/', { challenged: player.id, match_date: matchDate });
      alert('¡Desafío emitido exitosamente!');
      if (onChallengeSuccess) onChallengeSuccess();
    } catch (err) {
      console.error('Error al emitir el desafío:', err);
      const msg = err.response?.data?.detail || 'No se pudo emitir el desafío.';
      alert(`Error: ${msg}`);
    }
  };

  if (loading) {
    return (
      <div className="vanguard-card profile-card">
        <p className="geist-mono loading-text">CARGANDO EXPEDIENTE DE JUGADOR...</p>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="vanguard-card profile-card">
        <div className="error-banner">{error || 'Jugador no encontrado.'}</div>
      </div>
    );
  }

  return (
    <>
      <style>{playerStyleCSS}</style>

      <div className="vanguard-card profile-card">
        {/* Banner Superior con Rango */}
        <div className="profile-header">
          <div className="profile-identity">
            <div className="profile-avatar">
              {player?.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="profile-titles">
              <span className="geist-mono tag-label">@{player?.tag}</span>
              <h2 className="player-fullname">{player?.name}</h2>
            </div>
          </div>
          <div className="rank-display">
            <span className="rank-label">RANK</span>
            <span className="rank-value">{player?.rank}</span>
          </div>
        </div>

        {/* Status Chip */}
        <div className="status-container">
          {player?.can_be_challenged ? (
            <span className="chip status-available">● DISPONIBLE PARA RETO</span>
          ) : (
            <span className="chip status-cooldown">▲ EN COOLDOWN / EN COMBATE</span>
          )}
        </div>

        {/* Grilla de Estadísticas Responsiva */}
        <div className="stats-grid">
          
            <div className="stat-box">
              <span className="stat-label">PERSONAJE</span>
              <span className="stat-value highlight">{player?.character}</span>
            </div>
          
          <div className="stat-box">
            <span className="stat-label">VICTORIAS / DERROTAS</span>
            <span className="stat-value">{player?.wins || 0}W - {player?.losses || 0}L</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">RATIO W/L</span>
            <span className="stat-value">
              {player?.losses ? ((player?.wins || 0) / player?.losses).toFixed(2) : (player?.wins || 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Acciones */}
        {token && player?.can_be_challenged && (
            <button onClick={handleChallenge} className="btn-full challenge-button">
              RETAR A ESTE JUGADOR
            </button>
        )}
      </div>
    </>
  );
};


export default Player;
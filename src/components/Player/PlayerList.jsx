import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { axiosClient } from '../../api/axiosClient';
import playersListCSS from './PlayersListStyle.js';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/players/');
        // Ordenar por rango por defecto
        const sorted = response.data.sort((a, b) => a.rank - b.rank);
        setPlayers(sorted);
      } catch (err) {
        setError('Error al sincronizar el roster de atletas.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filtrado dinámico en tiempo real
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="vanguard-card directory-container">
        <p className="geist-mono loading-text">DESPLEGANDO ROSTER GLOBAL DE ATLETAS...</p>
      </div>
    );
  }

  return (
    <>
      <style>{playersListCSS}</style>

      <div className="vanguard-card directory-container">
        {/* Header con Buscador */}
        <div className="directory-header">
          <div className="title-block">
            <span className="geist-mono section-label">GLOBAL ROSTER</span>
            <h2 className="directory-title">ATLETAS REGISTRADOS</h2>
          </div>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por tag o nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input geist-mono"
            />
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {/* Lista en Grid */}
        {filteredPlayers.length === 0 ? (
          <div className="empty-state">
            <p className="geist-mono">NO SE ENCONTRARON ATLETAS QUE COINCIDAN CON LA BÚSQUEDA</p>
          </div>
        ) : (
          <div className="players-grid">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="player-card" onClick={() => navigate(`/players/${player.id}`)}>
                
                {/* Cabecera Tarjeta */}
                <div className="card-top">
                  <div className="avatar-box">
                    {player.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="rank-badge">
                    <span className="rank-title">RANK</span>
                    <span className="rank-num">#{player.rank}</span>
                  </div>
                </div>

                {/* Info Jugador */}
                <div className="player-info">
                  <span className="geist-mono player-name">{player.name}</span>
                  <h3 className="player-tag">{player.tag}</h3>
                </div>

                {/* Status Indicator */}
                <div className="status-row">
                  {player.can_be_challenged ? (
                    <span className="status-dot online" title="Disponible para Reto">
                      ● DISPONIBLE
                    </span>
                  ) : (
                    <span className="status-dot offline" title="En Cooldown / Ocupado">
                      ▲ COOLDOWN
                    </span>
                  )}
                </div>

                {/* Métricas Rápidas */}
                <div className="card-stats">
                  <div className="stat-item">
                    <span className="stat-lbl">RATIO W/L</span>
                    <span className="stat-val highlight">{player?.losses ? ((player?.wins || 0) / player?.losses).toFixed(2) : (player?.wins || 0).toFixed(2)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-lbl">RECORD</span>
                    <span className="stat-val">{player.wins || 0}W - {player.losses || 0}L</span>
                  </div>
                </div>

                {/* Botón Acción a Perfil */}
                <button onClick={() => navigate(`/players/${player.id}`)} className="btn-view-profile">
                    VER PERFIL
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PlayersList;
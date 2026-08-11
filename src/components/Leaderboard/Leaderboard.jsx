import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axiosClient'; // Ajusta la ruta a tu cliente Axios
import './Leaderboard.css'; // Estilos retro/arcade opcionales

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axiosClient.get('/players/leaderboard/');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error al cargar la lista de ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para renderizar el icono de tendencia
  const renderTrendIcon = (trend) => {
    switch (trend) {
      case 'UP':
        return <span className="trend-icon trend-up" title="Subió de posición">▲</span>;
      case 'DOWN':
        return <span className="trend-icon trend-down" title="Bajó de posición">▼</span>;
      case 'EQUAL':
      default:
        return <span className="trend-icon trend-equal" title="Sin cambios">▬</span>;
    }
  };

  if (loading) {
    return <div className="leaderboard-loading">Cargando clasificación...</div>;
  }

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">TOP FIGHTERS - SF6</h2>
      
      <div className="leaderboard-table">
        <div className="table-header">
          <span className="col-rank">#</span>
          <span className="col-tag">JUGADOR</span>
          <span className="col-char">MAIN</span>
          {/*<span className="col-points">PUNTOS</span>*/}
          <span className="col-trend">VAR</span>
        </div>

        <div className="table-body">
          {players.map((player) => (
            <div key={player.id} className={`table-row rank-${player.rank}`}>
              <span className="col-rank font-mono">#{player.rank}</span>
              <span className="col-tag font-bold">{player.tag}</span>
              <span className="col-char text-muted">{player.character}</span>
              {/*<span className="col-points font-mono">{player.rank}</span>*/}
              <span className="col-trend">{renderTrendIcon(player.trend)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { axiosClient } from '../../api/axiosClient';
import './ChallengesListStyle.css';
import './ChallengesModalStyle.css';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del modal de reporte de resultado
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [challengerScore, setChallengerScore] = useState(0);
  const [challengedScore, setChallengedScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      // Petición al endpoint global de desafíos
      const response = await axiosClient.get('/challenges/');
      setChallenges(response.data);
    } catch (err) {
      setError('Error al sincronizar los encuentros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // Filtrado de lista por estado
  const filteredChallenges = challenges.filter((ch) => {
    if (filter === 'ALL') return true;
    return ch.status === filter;
  });

  // Métricas rápidas
  const totalPending = challenges.filter((c) => c.status === 'PENDING').length;
  const totalAccepted = challenges.filter((c) => c.status === 'ACCEPTED').length;
  const totalCompleted = challenges.filter((c) => c.status === 'FINISHED').length;
  const totalRejected = challenges.filter((c) => c.status === 'REJECTED').length;
  const totalCancelled = challenges.filter((c) => c.status === 'CANCELLED').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="status-tag pending">⚡ PENDIENTE</span>;
      case 'ACCEPTED':
        return <span className="status-tag accepted">⚔️ CONFIRMADO</span>;
      case 'FINISHED':
        return <span className="status-tag completed">✔ FINALIZADO</span>;
      case 'REJECTED':
        return <span className="status-tag rejected">✖ RECHAZADO</span>;
      case 'CANCELLED':
        return <span className="status-tag cancelled">🚫 CANCELADO</span>;
      default:
        return <span className="status-tag">{status}</span>;
    }
  };

  // Abrir modal de reporte
  const openReportModal = (challenge) => {
    setSelectedMatch(challenge);
    setChallengerScore(0);
    setChallengedScore(0);
  };

  const closeReportModal = () => {
    setSelectedMatch(null);
    setChallengerScore(0);
    setChallengedScore(0);
  };

  // Helper para determinar el ganador según el marcador ingresado en el modal
  const getWinnerInfo = () => {
    if (!selectedMatch) return null;
    const cScore = Number(challengerScore);
    const dScore = Number(challengedScore);

    const challengerId = selectedMatch.challenger?.id || selectedMatch.challenger || selectedMatch.challenger_id;
    const challengedId = selectedMatch.challenged?.id || selectedMatch.challenged || selectedMatch.challenged_id;

    if (cScore > dScore) {
      return { id: challengerId, name: selectedMatch.challenger_tag || selectedMatch.challenger?.tag || selectedMatch.challenger_name };
    } else if (dScore > cScore) {
      return { id: challengedId, name: selectedMatch.challenged_tag || selectedMatch.challenged?.tag || selectedMatch.challenged_name };
    }
    return null;
  };

  // Guardar marcador final y ganador
  const handleConfirmFinishMatch = async (e) => {
    e.preventDefault();
    if (!selectedMatch) return;

    const winner = getWinnerInfo();
    const cScore = Number(challengerScore);
    const dScore = Number(challengedScore);

    if (cScore === dScore) {
      alert('Debes ingresar un marcador con un ganador claro (los puntajes no pueden ser iguales).');
      return;
    }

    try {
      setSubmitting(true);
      await axiosClient.post(`/challenges/${selectedMatch.id}/finish_match/`, {
        challenger_score: cScore,
        challenged_score: dScore,
        winner_id: winner.id
      });

      alert(`Resultado registrado correctamente. ¡Ganador: @${winner.name}!`);
      closeReportModal();
      fetchChallenges();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Error al reportar el resultado.';
      alert(`Error: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="vanguard-container">
        <p className="geist-mono loading-text">DESPLEGANDO FEED GLOBAL DE DESAFÍOS...</p>
      </div>
    );
  }

  const calculatedWinner = getWinnerInfo();

  return (
    <>
      <style>{challengesModalCSS}</style>

      <div className="vanguard-container">

        {/* Banner Superior & Métricas */}
        <div className="home-header">
          <div className="title-block">
            <span className="geist-mono text-gold">MATCHMAKING HUB</span>
            <h1 className="home-title">PANEL GLOBAL DE RETOS</h1>
          </div>

          <div className="metrics-strip">
            <div className="metric-box">
              <span className="m-label geist-mono">PENDIENTES</span>
              <span className="m-val text-gold">{totalPending}</span>
            </div>
            <div className="metric-box">
              <span className="m-label geist-mono">EN CURSO</span>
              <span className="m-val text-blue">{totalAccepted}</span>
            </div>
            <div className="metric-box">
              <span className="m-label geist-mono">FINALIZADOS</span>
              <span className="m-val text-green">{totalCompleted}</span>
            </div>
            <div className="metric-box">
              <span className="m-label geist-mono">RECHAZADOS</span>
              <span className="m-val text-red">{totalRejected}</span>
            </div>
            <div className="metric-box">
              <span className="m-label geist-mono">CANCELADOS</span>
              <span className="m-val text-gray">{totalCancelled}</span>
            </div>

          </div>
        </div>

        {error && <div className="error-banner geist-mono">{error}</div>}

        {/* Barra de Filtros */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            TODOS ({challenges.length})
          </button>
          <button
            className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            PENDIENTES
          </button>
          <button
            className={`filter-btn ${filter === 'ACCEPTED' ? 'active' : ''}`}
            onClick={() => setFilter('ACCEPTED')}
          >
            CONFIRMADOS
          </button>
          <button
            className={`filter-btn ${filter === 'FINISHED' ? 'active' : ''}`}
            onClick={() => setFilter('FINISHED')}
          >
            FINALIZADOS
          </button>
        </div>

        {/* Lista en Feed de Enfrentamientos */}
        {filteredChallenges.length === 0 ? (
          <div className="empty-state geist-mono">
            NO HAY ENCUENTROS REGISTRADOS BAJO ESTE FILTRO
          </div>
        ) : (
          <div className="challenges-grid">
            {filteredChallenges.map((ch) => {
              const winnerId = ch.winner;
              const isFinished = ch.status === 'FINISHED';
              const isAccepted = ch.status === 'ACCEPTED';
              const challengerId = ch.challenger?.id || ch.challenger || ch.challenger_id;
              const challengedId = ch.challenged?.id || ch.challenged || ch.challenged_id;
              const isChallengerWinner = isFinished && Number(winnerId) === Number(challengerId);
              const isChallengedWinner = isFinished && Number(winnerId) === Number(challengedId);

              return (
                <div key={ch.id} className="challenge-card">

                  {/* Cabecera Tarjeta */}
                  <div className="card-header">
                    <span className="match-id geist-mono">MATCH #{ch.id}</span>
                    {getStatusBadge(ch.status)}
                  </div>

                  {/* VS Display (Retador vs Retado) */}
                  <div className="vs-container">
                    <div className={`player-block ${isChallengerWinner ? 'winner-highlight' : ''}`}>
                      {isChallengerWinner && <span className="winner-crown">👑 GANADOR</span>}
                      <span className="role-lbl geist-mono">RETADOR</span>
                      <Link to={`/players/${ch.challenger}`} className="player-name">
                        {ch.challenger_tag}
                      </Link>
                    </div>

                    {/* Marcador Central / VS */}
                    <div className="score-center-display">
                      {isFinished && ch?.challenger_score !== undefined && ch?.challenged_score !== undefined ? (
                        <div className="score-badge">
                          {ch.challenger_score} - {ch.challenged_score}
                        </div>
                      ) : (
                        <span className="vs-badge">VS</span>
                      )}
                    </div>

                    <div className={`player-block ${isChallengedWinner ? 'winner-highlight' : ''}`}>
                      {isChallengedWinner && <span className="winner-crown">👑 GANADOR</span>}
                      <span className="role-lbl geist-mono">RETADO</span>
                      <Link to={`/players/${ch.challenged}`} className="player-name">
                        {ch.challenged_tag}
                      </Link>
                    </div>
                  </div>

                  {/* Info adicional / Fechas */}
                  <div className="match-details">
                    <span className="geist-mono detail-label">FECHA:</span>
                    <span className="geist-mono detail-value">{ch.match_date ? new Date(ch.match_date).toLocaleDateString() : 'POR DEFINIR'}</span>
                  </div>

                  {/* Acción para Ingresar Marcador */}
                  {isAccepted && (
                    <div className="action-row">
                      <button onClick={() => openReportModal(ch)} className="btn-primary btn-full">
                        REGISTRAR MARCADOR Y FINALIZAR
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal para Ingresar Resultado Exacto */}
      {selectedMatch && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <span className="geist-mono text-gold">REGISTRO DE PUNTUACIÓN</span>
              <h3>FINALIZAR MATCH #{selectedMatch.id}</h3>
            </div>

            <form onSubmit={handleConfirmFinishMatch}>
              <div className="modal-body">
                <p className="geist-mono subtext">Ingresa el puntaje/set obtenido por cada atleta:</p>
                
                <div className="score-inputs-wrapper">
                  {/* Score Retador */}
                  <div className="score-input-group">
                    <label className="geist-mono score-player-name">
                      {selectedMatch.challenger_tag || selectedMatch.challenger?.tag || selectedMatch.challenger_name}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="score-field"
                      value={challengerScore}
                      onChange={(e) => setChallengerScore(e.target.value)}
                      required
                    />
                  </div>

                  <span className="score-divider">-</span>

                  {/* Score Desafiado */}
                  <div className="score-input-group">
                    <label className="geist-mono score-player-name">
                      {selectedMatch.challenged_tag || selectedMatch.challenged?.tag || selectedMatch.challenged_name}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="score-field"
                      value={challengedScore}
                      onChange={(e) => setChallengedScore(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Feedback dinámico de ganador */}
                <div className="winner-preview-box geist-mono">
                  {calculatedWinner ? (
                    <span className="text-gold">👑 GANADOR: {calculatedWinner.name}</span>
                  ) : (
                    <span className="text-muted">EMPATE (ASIGNA UN GANADOR)</span>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeReportModal} className="btn-secondary">
                  CANCELAR
                </button>
                <button type="submit" disabled={submitting || !calculatedWinner} className="btn-primary">
                  {submitting ? 'GUARDANDO...' : 'GUARDAR MARCADOR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChallengesList;
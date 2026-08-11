import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axiosClient';
import challengesStyleCSS from './ChallengesStyle.js';
import challengesModalCSS from './ChallengesModalStyle.js';



const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar el modal de reporte de resultado
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [challengerScore, setChallengerScore] = useState(0);
  const [challengedScore, setChallengedScore] = useState(0);

  const [currentPlayerData, setCurrentPlayerData] = useState("")
  
  const [submitting, setSubmitting] = useState(false);

  // Obtener la lista de retos del usuario autenticado
  const fetchMyChallenges = async () => {
    try {
      setLoading(true);
      // Endpoint personalizado en DRF para mis retos pendientes/activos
      const response = await axiosClient.get('/challenges/my_challenges/');
      setChallenges(response.data);
    } catch (err) {
      setError('No se pudieron cargar tus retos activos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPlayerData(JSON.parse(localStorage.getItem('player_data')))
    fetchMyChallenges();
    
  }, []);

  // Responder a un reto (ACEPTAR / RECHAZAR)
  const handleRespond = async (challengeId, action) => {
    try {
      await axiosClient.post(`/challenges/${challengeId}/respond_challenge/`, {
        action: action
      });
      alert(`Reto ${action === 'ACCEPTED' ? 'aceptado' : 'rechazado'} con éxito.`);
      fetchMyChallenges();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Error al responder al reto.';
      alert(`Error: ${msg}`);
    }
  };

  // Abrir modal de reporte de resultado
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

  // Determinar ganador dinámicamente según el marcador
  const getWinnerInfo = () => {
    if (!selectedMatch) return null;
    const cScore = Number(challengerScore);
    const dScore = Number(challengedScore);

    const challengerId = selectedMatch.challenger || selectedMatch.challenger_id;
    const challengedId = selectedMatch.challenged || selectedMatch.challenged_id;

    if (cScore > dScore) {
      return { id: challengerId, name: selectedMatch.challenger_tag || selectedMatch.challenger_name };
    } else if (dScore > cScore) {
      return { id: challengedId, name: selectedMatch.challenged_tag || selectedMatch.challenged_name };
    }
    return null; // Empate
  };

  // Finalizar partida y reportar resultado
  const handleConfirmFinishMatch = async (e) => {
    e.preventDefault();
    if (!selectedMatch) return;
    
    const winner = getWinnerInfo();
    const cScore = Number(challengerScore);
    const dScore = Number(challengedScore);
    
    if (cScore === dScore) {
      alert('Debes ingresar un ganador claro (los puntajes no pueden ser iguales).');
      return;
    }

    try {
      setSubmitting(true);
      await axiosClient.post(`/challenges/${selectedMatch.id}/finish_match/`, {
        challenger_score: cScore,
        challenged_score: dScore,
        winner_id: winner.id
      });
      alert(`Resultado registrado: ${cScore}-${dScore}. ¡Ganador: @${winner.name}!`)
      closeReportModal();
      fetchMyChallenges();
    } catch (err) {
      const msg = err.response?.data?.detail || 'Error al finalizar el encuentro.';
      alert(`Error: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="vanguard-card">
        <p className="geist-mono loading-text">ACCEDIENDO A CENTRO DE CONTROL DE RETOS...</p>
      </div>
    );
  }

  const calculatedWinner = getWinnerInfo();

  return (
    <>
      <style>{challengesStyleCSS}</style>
      <style>{challengesModalCSS}</style>

      <div className="vanguard-card challenges-container">
        <div className="challenges-header">
          <span className="geist-mono section-label">MATCHMAKING HUB</span>
          <h2 className="challenges-title">MIS RETOS</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {challenges.length === 0 ? (
          <div className="empty-state">
            <p className="geist-mono">NO TIENES RETOS PENDIENTES NI ENCUENTROS EN CURSO</p>
          </div>
        ) : (
          <div className="challenges-list">
            {challenges.map((challenge, index) => {
              const isPending = challenge?.status === 'PENDING';
              const isAccepted = challenge?.status === 'ACCEPTED';
              const isRejected = challenge?.status === 'REJECTED';
              const isFinished = challenge?.status === 'FINISHED';
              const isCanceled = challenge?.status === 'CANCELED';
              // Regla Ladder: Solo el primer reto (índice 0) de la cola se puede responder
              const isFirstInQueue = index === 0;
              
              // Indicar "Aceptar o rechazar" solo si soy el desafiado
              const challengerId = challenge?.challenger || challenge?.challenger_id;
              const challengedId = challenge?.challenged || challenge?.challenged_id;
              const isChallenged = currentPlayerData.id === challengedId

              // Identificar ID del ganador si el reto ya finalizó
              const winnerId = challenge?.winner || challenge?.winner_id;
           
              const isChallengerWinner = isFinished && Number(winnerId) === Number(challengerId);
              const isChallengedWinner = isFinished && Number(winnerId) === Number(challengedId);

              return (
                <div key={challenge?.id} className="challenge-card">
                  
                  {/* Encabezado del Reto con Status Chip */}
                  <div className="challenge-card-header">
                    <span className="geist-mono challenge-id">MATCH #{challenge?.id}</span>
                    
                    {isPending && (
                      <span className="chip status-pending">RETO PENDIENTE</span>
                    )}
                    {isAccepted && (
                      <span className="chip status-accepted">EN CURSO</span>
                    )}
                    {isRejected && (
                      <span className="chip status-rejected">RETO RECHAZADO</span>
                    )}
                    {isFinished && (
                      <span className="chip status-finished">ENCUENTRO FINALIZADO</span>
                    )}
                    {isCanceled && (
                      <span className="chip status-canceled">RETO CANCELADO</span>
                    )}
                  </div>

                  {/* Versus Display */}
                  <div className="versus-box">
                    <div className={`player-block ${isChallengerWinner ? 'winner-highlight' : ''}`}>
                      {isChallengerWinner && <span className="winner-crown">👑 GANADOR</span>}
                      <span className="role-label">RETADOR</span>
                      <span className="player-id-text">{challenge?.challenger_tag}</span>
                    </div>
                  

                  {/* Marcador Central / VS */}
                    <div className="score-center-display">
                      {isFinished && challenge?.challenger_score !== undefined ? (
                        <div className="score-badge">
                          {challenge.challenger_score} - {challenge.challenged_score}
                        </div>
                      ) : (
                        <span className="vs-badge">VS</span>
                      )}
                    </div>

                    {/* Desafiado */}
                    <div className={`player-block text-right ${isChallengedWinner ? 'winner-highlight' : ''}`}>
                      {isChallengedWinner && <span className="winner-crown text-right">👑 GANADOR</span>}
                      <span className="role-label">DESAFIADO</span>
                      <span className="player-id-text">{challenge?.challenged_tag || challenge?.challenged_name}</span>
                    </div>
                  </div>

                  {/* Detalles de la cita */}
                  <div className="match-details">
                    <span className="geist-mono detail-label">FECHA PROGRAMADA:</span>
                    <span className="geist-mono detail-value">
                      {new Date(challenge?.match_date).toLocaleString()}
                    </span>
                  </div>

                  {/* Acciones de Respuesta (Solo para el PRIMER reto de la cola) */}
                  {isPending  && isChallenged && (
                    <div className="action-row">
                      {isFirstInQueue ? (
                        <>
                          <button
                            onClick={() => handleRespond(challenge?.id, 'ACCEPTED')}
                            className="btn-primary flex-1"
                          >
                            ACEPTAR
                          </button>
                          <button
                            onClick={() => handleRespond(challenge?.id, 'REJECTED')}
                            className="btn-danger flex-1"
                          >
                            RECHAZAR
                          </button>
                        </>
                      ) : (
                        <div className="queue-notice">
                          🔒 En cola de espera (Debes responder al reto anterior primero)
                        </div>
                      )}
                    </div>
                  )}

                  {/* Acción para finalizar encuentro en curso */}
                  {isAccepted && (
                    <div className="action-row">
                      <button
                        onClick={() => openReportModal(challenge)}
                        className="btn-primary btn-full"
                      >
                        FINALIZAR ENCUENTRO Y REPORTAR
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
              <span className="geist-mono text-gold">// REGISTRO DE PUNTUACIÓN</span>
              <h3>FINALIZAR MATCH #{selectedMatch.id}</h3>
            </div>

            <form onSubmit={handleConfirmFinishMatch}>
              <div className="modal-body">
                <p className="geist-mono subtext">Ingresa los puntos/sets obtenidos por cada atleta:</p>
                
                <div className="score-inputs-wrapper">
                  {/* Input Retador */}
                  <div className="score-input-group">
                    <label className="geist-mono score-player-name">
                      {selectedMatch.challenger_tag || selectedMatch.challenger_name}
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

                  {/* Input Desafiado */}
                  <div className="score-input-group">
                    <label className="geist-mono score-player-name">
                      @{selectedMatch.challenged_tag || selectedMatch.challenged_name}
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

                {/* Feedback dinámico de quién va ganando */}
                <div className="winner-preview-box geist-mono">
                  {calculatedWinner ? (
                    <span className="text-gold">👑 GANADOR DETERMINADO: @{calculatedWinner.name}</span>
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
};

export default Challenges;
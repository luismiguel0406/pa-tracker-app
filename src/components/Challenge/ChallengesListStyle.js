// Estilos CSS
const challengesListCSS = `
  .vanguard-container {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 32px;
  }

  .home-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-bottom: 1px solid #38342b;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    .home-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  .text-gold { color: #f2ca50; }
  .text-blue { color: #50a2f2; }
  .text-green { color: #4cd964; }
  .text-red { color: #ff3b30; }
  .text-gray { color: #8e8e93; }

  .home-title {
    font-family: 'Anybody', sans-serif;
    font-size: 28px;
    font-style: italic;
    color: #eae1d4;
    margin: 4px 0 0 0;
  }

  /* Strip de Métricas */
  .metrics-strip {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 12px;  
  }

  .metric-box {
    background-color: #110e07;
    border: 1px solid #38342b;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    min-width: 90px;
  }

  .m-label {
    font-size: 9px;
    color: #99907c;
  }

  .m-val {
    font-family: 'Anybody', sans-serif;
    font-size: 20px;
    font-weight: 800;
  }

  /* Filtros */
  .filter-bar {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }

  .filter-btn {
    background-color: #1f1b13;
    border: 1px solid #38342b;
    color: #99907c;
    font-family: 'Geist', monospace;
    font-size: 11px;
    padding: 8px 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .filter-btn:hover, .filter-btn.active {
    background-color: #f2ca50;
    color: #110e07;
    border-color: #f2ca50;
    font-weight: 700;
  }

  /* Grid de Desafíos */
  .challenges-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 640px) {
    .challenges-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .challenge-card {
    background-color: #1f1b13;
    border: 1px solid #38342b;
    border-top: 3px solid #4d4635;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .match-id {
    font-size: 10px;
    color: #99907c;
  }

  .status-tag {
    font-family: 'Geist', monospace;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    background-color: #110e07;
    border: 1px solid #38342b;
  }

  .status-tag.pending { color: #f2ca50; border-color: #f2ca50; }
  .status-tag.accepted { color: #50a2f2; border-color: #50a2f2; }
  .status-tag.completed { color: #4cd964; border-color: #4cd964; }
  .status-tag.rejected { color: #ff3b30; border-color: #ff3b30; }
  .status-tag.cancelled { color: #8e8e93; border-color: #8e8e93; }

  /* VS Container */
  .vs-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #110e07;
    border: 1px solid #2d2a21;
    padding: 12px;
  }

  .player-side {
    display: flex;
    flex-direction: column;
    width: 42%;
  }

  .player-side.challenged {
    text-align: right;
  }

  .role-lbl {
    font-family: 'Geist', monospace;
    font-size: 9px;
    color: #666053;
    letter-spacing: 1px;
  }

  .player-name {
    font-family: 'Anybody', sans-serif;
    font-style: italic;
    font-size: 14px;
    color: #eae1d4;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-name:hover {
    color: #f2ca50;
  }

  .player-block {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .player-block.text-right {
    text-align: right;
  }

  .vs-badge {
    font-family: 'Anybody', sans-serif;
    font-weight: 800;
    font-style: italic;
    color: #f2ca50;
    font-size: 14px;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #99907c;
    border-top: 1px solid #2d2a21;
    padding-top: 8px;
  }

  .winner-tag {
    color: #4cd964;
    font-weight: 700;
  }

  .empty-state {
    background-color: #110e07;
    border: 1px dashed #38342b;
    padding: 32px;
    text-align: center;
    color: #99907c;
    font-size: 12px;
  }

  .loading-text {
    color: #f2ca50;
  }

  .geist-mono {
    font-family: 'Geist', monospace;
  }

  .match-details {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 11px;
  }

  .detail-label {
    color: #666053;
  }

  .detail-value {
    color: #99907c;
  }

  .action-row {
    display: flex;
    gap: 12px;
    margin-top: 4px;
  }

  .score-badge {
    background-color: #f2ca50;
    color: #110e07;
    font-family: 'Anybody', sans-serif;
    font-weight: 800;
    padding: 6px 14px;
    font-size: 18px;
    border-radius: 2px;
    letter-spacing: 2px;
  }

  .score-center-display {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .winner-highlight {
    background-color: rgba(242, 202, 80, 0.08);
    border: 1px solid #f2ca50 !important;
    padding: 8px;
    position: relative;
  }

  .winner-crown {
    display: block;
    font-family: 'Geist', monospace;
    font-size: 9px;
    color: #f2ca50;
    font-weight: bold;
    margin-bottom: 2px;
  }
`;

export default challengesListCSS;
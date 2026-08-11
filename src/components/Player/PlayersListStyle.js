const playersListCSS = `
  .directory-container {
    border-top: 3px solid #f2ca50 !important;
    max-width: 1000px;
    margin: 0 auto 32px auto;
  }

  .directory-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid #38342b;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }

  @media (min-width: 640px) {
    .directory-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  .directory-title {
    font-family: 'Anybody', sans-serif;
    font-size: 26px;
    font-style: italic;
    color: #eae1d4;
    margin: 4px 0 0 0;
    text-transform: uppercase;
  }

  /* Buscador Estilizado */
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  @media (min-width: 640px) {
    .search-box {
      width: 280px;
    }
  }

  .search-icon {
    position: absolute;
    left: 10px;
    font-size: 12px;
    opacity: 0.6;
  }

  .search-input {
    width: 100%;
    background-color: #110e07;
    border: 1px solid #4d4635;
    color: #eae1d4;
    padding: 8px 12px 8px 32px;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    border-color: #f2ca50;
  }

  /* Grid de Tarjetas */
  .players-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 520px) {
    .players-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 840px) {
    .players-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Tarjeta Individual */
  .player-card {
    background-color: #1f1b13;
    border: 1px solid #38342b;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    transition: transform 0.2s, border-color 0.2s;
  }

  .player-card:hover {
    border-color: #f2ca50;
    transform: translateY(-2px);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .avatar-box {
    width: 44px;
    height: 44px;
    background-color: #110e07;
    border: 1px solid #f2ca50;
    color: #f2ca50;
    font-family: 'Anybody', sans-serif;
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rank-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .rank-title {
    font-family: 'Geist', monospace;
    font-size: 9px;
    color: #99907c;
  }

  .rank-num {
    font-family: 'Anybody', sans-serif;
    font-weight: 800;
    font-size: 20px;
    color: #f2ca50;
  }

  .player-info {
    display: flex;
    flex-direction: column;
  }

  .player-name {
    font-size: 11px;
    color: #f2ca50;
  }

  .player-tag {
    font-family: 'Anybody', sans-serif;
    font-style: italic;
    font-size: 18px;
    color: #eae1d4;
    margin: 2px 0 0 0;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Status Dots */
  .status-row {
    font-family: 'Geist', monospace;
    font-size: 10px;
    font-weight: 700;
  }

  .status-dot.online {
    color: #4cd964;
  }

  .status-dot.offline {
    color: #ff3b30;
  }

  /* Stats Rápidas */
  .card-stats {
    display: flex;
    justify-content: space-between;
    background-color: #110e07;
    border: 1px solid #2d2a21;
    padding: 8px 12px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
  }

  .stat-lbl {
    font-family: 'Geist', monospace;
    font-size: 9px;
    color: #99907c;
  }

  .stat-val {
    font-family: 'Geist', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #eae1d4;
  }

  .stat-val.highlight {
    color: #f2ca50;
  }

  /* Botón de Enlace */
  .btn-view-profile {
    display: block;
    text-align: center;
    background-color: #2d281e;
    color: #eae1d4;
    border: 1px solid #4d4635;
    font-family: 'Geist', sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    padding: 8px;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
  }

  .btn-view-profile:hover {
    background-color: #f2ca50;
    color: #110e07;
    border-color: #f2ca50;
  }

  .empty-state {
    background-color: #110e07;
    border: 1px dashed #4d4635;
    padding: 32px 16px;
    text-align: center;
    color: #99907c;
    font-size: 13px;
  }

  .geist-mono {
    font-family: 'Geist', monospace;
  }
`;

export default playersListCSS;
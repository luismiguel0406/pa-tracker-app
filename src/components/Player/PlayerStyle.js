// Estilos CSS Integrados Responsivos
const playerStyleCSS = `
  .profile-card {
    border-top: 3px solid #f2ca50 !important;
    max-width: 600px;
    margin: 0 auto 24px auto;
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid #38342b;
    padding-bottom: 16px;
  }

  @media (min-width: 480px) {
    .profile-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .profile-identity {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
    background-color: #110e07;
    border: 1px solid #f2ca50;
    color: #f2ca50;
    font-family: 'Anybody', sans-serif;
    font-weight: 800;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .profile-titles {
    display: flex;
    flex-direction: column;
  }

  .tag-label {
    font-family: 'Geist', monospace;
    font-size: 12px;
    color: #f2ca50;
  }

  .player-fullname {
    font-family: 'Anybody', sans-serif;
    font-style: italic;
    font-size: 22px;
    color: #eae1d4;
    margin: 0;
    text-transform: uppercase;
  }

  .rank-display {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 8px;
    background-color: #1a160d;
    padding: 8px 12px;
    border: 1px solid #4d4635;
    align-self: flex-start;
  }

  @media (min-width: 480px) {
    .rank-display {
      flex-direction: column;
      align-items: flex-end;
      gap: 0;
      background: none;
      border: none;
      padding: 0;
    }
  }

  .rank-label {
    font-family: 'Geist', monospace;
    font-size: 10px;
    color: #99907c;
  }

  .rank-value {
    font-family: 'Anybody', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #f2ca50;
    line-height: 1;
  }

  .status-container {
    margin: 16px 0;
  }

  /* Grid de Estadísticas Adaptable */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  @media (min-width: 480px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .stat-box {
    background-color: #1a160d;
    border: 1px solid #38342b;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-label {
    font-family: 'Geist', monospace;
    font-size: 10px;
    color: #99907c;
  }

  .stat-value {
    font-family: 'Geist', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #eae1d4;
  }

  .stat-value.highlight {
    color: #f2ca50;
  }

  .btn-full {
    width: 100%;
  }

  .geist-mono {
    font-family: 'Geist', monospace;
  }


  .challenge-button{
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
   .challenge-button:hover {
      background-color: #f2ca50;
      color: #110e07;
      border-color: #f2ca50;
    }  
`;

export default playerStyleCSS;
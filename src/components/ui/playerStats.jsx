import './playerStats.css';
import { useContext } from 'react';
import { GameContext } from '../../pages/home';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function PlayerStats() {
  const { gameCount, winCount, pushCount, loseCount, mitCount, bank } = useContext(GameContext);

  return (
    <div className="player-stats-container flex-row">
      <div className="player-stats flex-column">
        <div className="stat-row flex-row">
          <div className="stat-label">Games:</div>
          <div className="stat-value">{gameCount}</div>
        </div>
        <div className="stat-row flex-row">
          <div className="stat-label">Wins:</div>
          <div className="stat-value">{winCount}</div>
        </div>
        <div className="stat-row flex-row">
          <div className="stat-label">Pushes:</div>
          <div className="stat-value">{pushCount}</div>
        </div>
        <div className="stat-row flex-row">
          <div className="stat-label">Losses:</div>
          <div className="stat-value">{loseCount}</div>
        </div>
        <div className="stat-row flex-row">
          <div className="stat-label">Count: </div>
          <div className="stat-value hidden-value">{mitCount}</div>
        </div>
      </div>
      <div className="player-bank">
        <div className="bank-container flex-row">
          <div className="bank-label">Bank:</div>
          <div className="bank-amount">{USDollar.format(bank)}</div>
        </div>
      </div>
    </div>
  );
}

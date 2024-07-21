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
  const { gameCount, winCount, pushCount, loseCount, bank } = useContext(GameContext);

  return (
    <div className="player-stats-container flex-row">
      <div className="player-stats flex-column">
        <div className="game-count-container flex-row">
          <div className="game-count-label">Game:</div>
          <div className="game-count-amount">{gameCount}</div>
        </div>
        <div className="win-count-container flex-row">
          <div className="win-count-label">Wins:</div>
          <div className="win-count-amount">{winCount}</div>
        </div>
        <div className="push-count-container flex-row">
          <div className="push-count-label">Push:</div>
          <div className="push-count-amount">{pushCount}</div>
        </div>
        <div className="lose-count-container flex-row">
          <div className="lose-count-label">Loss:</div>
          <div className="lose-count-amount">{loseCount}</div>
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

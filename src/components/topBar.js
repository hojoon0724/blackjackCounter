import './topBar.css';
import DeckAmountInput from '../components/deckAmountInput';

export default function TopBar({ mitCount }) {
  return (
    <div className="top-bar flex-row space-between align-center">
      <div className="app-name">Blackjack Counter</div>
      <div className="mit-count-container flex-row">
        <div className="mit-count-label">Count: </div>
        <div className="mit-count-value">{mitCount}</div>
      </div>
    </div>
  );
}

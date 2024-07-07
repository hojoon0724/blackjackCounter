import './topBar.css';
import DeckAmountInput from '../components/deckAmountInput';

export default function TopBar({ deckAmount, setDeckAmount }) {
  return (
    <div className="top-bar flex-row space-between align-center">
      <div className="app-name">Blackjack Counter</div>
      <div className="money-container flex-row">
        <div className="money-label">Money:</div>
        <div className="money-value">$1,000</div>
      </div>
      <DeckAmountInput deckAmount={deckAmount} setDeckAmount={setDeckAmount} />
    </div>
  );
}

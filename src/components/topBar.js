import './topBar.css';
import DeckAmountInput from '../components/deckAmountInput';

export default function TopBar({ deckAmount, setDeckAmount, actions }) {
  return (
    <div className="top-bar flex-row space-between align-center">
      <div className="app-name">Blackjack Counter</div>
      <DeckAmountInput
        deckAmount={deckAmount}
        setDeckAmount={setDeckAmount}
        actions={actions}
      />
    </div>
  );
}

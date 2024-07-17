import './deckAmountInput.css';
import { GameContext } from '../../pages/home';
import { useContext } from 'react';

export default function DeckAmountInput() {
  const { deckAmount, setDeckAmount, actions } = useContext(GameContext);

  return (
    <div className="deck-amount-input-container flex-row align-center">
      <div className="deck-amount-label">Deck amount: </div>
      <div className="deck-amount-minus-button" onClick={() => setDeckAmount(prev => Math.max(1, prev - 1))}>
        -
      </div>
      <input
        className="deck-amount-input"
        type="text"
        value={deckAmount}
        onChange={e => {
          setDeckAmount(Number(e.target.value));
        }}
        style={{ textAlign: 'center' }}
      />
      <div className="deck-amount-plus-button" onClick={() => setDeckAmount(prev => prev + 1)}>
        +
      </div>
    </div>
  );
}

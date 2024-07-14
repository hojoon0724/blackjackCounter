import './deckAmountInput.css';

export default function DeckAmountInput({ deckAmount, setDeckAmount, actions }) {
  return (
    <div className="shuffle-container">
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
        <button className="action-button shuffle-button" onClick={actions.resetDeck.func}>
          Shuffle
        </button>
      </div>
    </div>
  );
}

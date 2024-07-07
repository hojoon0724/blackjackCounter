import './deckAmountInput.css';

export default function DeckAmountInput({ deckAmount, setDeckAmount }) {
  return (
    <div className="deck-amount-input-container flex-row align-center">
      <div className="deck-amount-label">Deck mount: </div>
      <div className="deck-amount-minus-button" onClick={() => setDeckAmount((prev) => Math.max(1, prev - 1))}>
        -
      </div>
      <input
        className="deck-amount-input"
        type="text"
        value={deckAmount}
        onChange={(e) => {
          setDeckAmount(Number(e.target.value));
        }}
        style={{ textAlign: 'center' }}
      />
      <div className="deck-amount-plus-button" onClick={() => setDeckAmount((prev) => prev + 1)}>
        +
      </div>
    </div>
  );
}

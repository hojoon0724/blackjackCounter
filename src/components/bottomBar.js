import './bottomBar.css';
import DeckAmountInput from './deckAmountInput';
import GameActionButtons from './gameActionButtons';

export default function BottomBar({ deckAmount, setDeckAmount, actions, gameInProgress }) {
  return (
    <div className="bottom-bar flex-row">
      <div className="empty">&nbsp;</div>
      {/* <div className="shuffle-container">
        <DeckAmountInput deckAmount={deckAmount} setDeckAmount={setDeckAmount} actions={actions} />
      </div> */}

      <GameActionButtons actions={actions} gameInProgress={gameInProgress} />

      <div className="shuffle-container">
        <DeckAmountInput deckAmount={deckAmount} setDeckAmount={setDeckAmount} actions={actions} />
      </div>
      {/* <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          className="action-button"
          onClick={actions.printArray.func}
        >
          Print Pile
        </motion.button> */}
      {/* <div className="deal-button-container flex-row">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.deal.disabled}
          className="deal-button"
          onClick={actions.deal.func}
        >
          Deal
        </motion.button>
      </div> */}
    </div>
  );
}

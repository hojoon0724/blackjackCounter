import './bottomBar.css';
import DeckAmountInput from './deckAmountInput';
import GameActionButtons from './gameActionButtons';

export default function BottomBar({ deckAmount, setDeckAmount, actions, gameInProgress }) {
  return (
    <div className="bottom-bar flex-row">
      <div className="empty">&nbsp;</div>
      <GameActionButtons actions={actions} gameInProgress={gameInProgress} />
      <DeckAmountInput deckAmount={deckAmount} setDeckAmount={setDeckAmount} actions={actions} />
    </div>
  );
}

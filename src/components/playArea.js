import DealerCardsContainer from './dealerCardsContainer';
import PlayerCardsContainer from './playerCardsContainer';
import DevButtons from './gameLogic/devButtons';
import './playArea.css';

export default function PlayArea({ dealerCards, playerCards, hiddenCard, devActions, gameInProgress }) {
  return (
    <>
      <DevButtons devActions={devActions} />
      <div className="play-area flex-column align-center">
        <DealerCardsContainer dealerCards={dealerCards} hiddenCard={hiddenCard} gameInProgress={gameInProgress} />
        <PlayerCardsContainer playerCards={playerCards} gameInProgress={gameInProgress} />
      </div>
    </>
  );
}

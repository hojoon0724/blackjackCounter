import DealerCardsContainer from './dealerCardsContainer';
import PlayerCardsContainer from './playerCardsContainer';

import { sumValues } from './gameLogic/calculations';

import './playArea.css';

export default function PlayArea({ dealerCards, playerCards, hiddenCard }) {
  return (
    <div className="play-area flex-column align-center">
      <div className="dealer-container flex-row justify-center">
        <DealerCardsContainer dealerCards={dealerCards} hiddenCard={hiddenCard} />
      </div>
      <div className="player-container">
        <PlayerCardsContainer playerCards={playerCards} />
        <div className="player-bet-container flex-row justify-center align-center">
          <div className="player-card-value">{sumValues(playerCards)}</div>
          <div className="player-chip-area"></div>
          <div className="player-bet-value">$100</div>
        </div>
      </div>
    </div>
  );
}

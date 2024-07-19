import PlayerHand from './components/playerHand';
import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function PlayerCardsContainer() {
  const { playerCards } = useContext(GameContext);

  return (
    <div className="player-container">
      <div className="player-hand flex-row">
        {playerCards.map((hand, handIndex) => (
          <div className="player-cards-container" id={handIndex} key={handIndex}>
            <PlayerHand hand={hand} handIndex={handIndex} />
          </div>
        ))}
      </div>
      <div className="player-bet-container flex-row justify-center align-center">
        <div className="player-chip-area"></div>
        <div className="player-bet-value"></div>
      </div>
    </div>
  );
}

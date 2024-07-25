import PlayerHand from './components/playerHand';
import { useContext } from 'react';
import { GameContext } from '../../pages/home';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function PlayerCardsContainer() {
  const { playerCards, betAmount, setBetAmount, setBank, winningsArray } = useContext(GameContext);

  return (
    <div className="player-container">
      <div className="player-hand flex-row justify-center">
        {playerCards.map((hand, handIndex) => (
          <div className="player-cards-container" id={handIndex} key={handIndex}>
            <PlayerHand hand={hand} handIndex={handIndex} handBet={winningsArray[handIndex]} />
          </div>
        ))}
      </div>
      <div className="player-bet-container flex-row justify-center align-center">
        <div className="player-bet-value">{USDollar.format(betAmount)}</div>
        <div className="player-chip-area"></div>
        <div className="player-bet-reset-container">
          <button
            className="player-bet-reset small-button"
            onClick={() => {
              let lastBet = betAmount;
              setBetAmount(0);
              setBank(prevAmt => prevAmt + lastBet);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

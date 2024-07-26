import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export function BettingBar() {
  const { setBetAmount, setBank } = useContext(GameContext);

  function processBet(amount) {
    setBank(prevAmt => prevAmt - amount);
    setBetAmount(prevAmt => prevAmt + amount);
  }

  const chipsArray = [1, 5, 10, 25, 50, 100, 500, 1000];

  return (
    <div className="betting-bar-container flex-row">
      {chipsArray.map(chip => {
        return (
          <div className={`betting-chip bet-${chip}`} onClick={() => processBet(chip)} key={`betting-chip-${chip}`}>
            {chip}
          </div>
        );
      })}
    </div>
  );
}

import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export function BettingBar() {
  const { setBetAmount } = useContext(GameContext);

  return (
    <div className="betting-bar-container flex-row">
      <div className="betting-chip bet-1" onClick={() => setBetAmount(prevAmt => prevAmt + 1)}>
        1
      </div>
      <div className="betting-chip bet-5" onClick={() => setBetAmount(prevAmt => prevAmt + 5)}>
        5
      </div>
      <div className="betting-chip bet-10" onClick={() => setBetAmount(prevAmt => prevAmt + 10)}>
        10
      </div>
      <div className="betting-chip bet-25" onClick={() => setBetAmount(prevAmt => prevAmt + 25)}>
        25
      </div>
      <div className="betting-chip bet-50" onClick={() => setBetAmount(prevAmt => prevAmt + 50)}>
        50
      </div>
      <div className="betting-chip bet-100" onClick={() => setBetAmount(prevAmt => prevAmt + 100)}>
        100
      </div>
      <div className="betting-chip bet-500" onClick={() => setBetAmount(prevAmt => prevAmt + 500)}>
        500
      </div>
      <div className="betting-chip bet-1000" onClick={() => setBetAmount(prevAmt => prevAmt + 1000)}>
        1000
      </div>
    </div>
  );
}

import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export function BettingBar() {
  const { setBetAmount, setBank, bank } = useContext(GameContext);

  function processBet(amount) {
    let bankroll = bank;
    let overdraftAmount = Math.abs(bankroll - amount);
    let maxBetAllowed = amount;
    if (bankroll - amount < 0) {
      overdraftAmount = bankroll - amount;
      maxBetAllowed = amount + overdraftAmount;
    }
    console.log(`bankroll ${bankroll} // overdraftAmount ${overdraftAmount} // maxBetAllowed ${maxBetAllowed}`);

    setBank(prevAmt => prevAmt - maxBetAllowed);
    setBetAmount(prevAmt => prevAmt + maxBetAllowed);
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

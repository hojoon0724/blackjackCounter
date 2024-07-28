import { useContext } from 'react';
import { GameContext } from '../../pages/home';
import { ChipVector } from './chipVector';
import { chipsObject } from '../../gameLogic/chipsObject';

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

  return (
    <div className="betting-bar-container flex-row align-center">
      {Object.entries(chipsObject).map(([key, chip]) => {
        return (
          <div
            className={`betting-chip bet-${chip.amount}`}
            onClick={() => processBet(chip.amount)}
            key={`betting-chip-${chip.amount}`}
          >
            <ChipVector textColor={chip.text} fillColor={chip.color} amount={chip.amount} />
            <div className="chip-amount-text flex-row align-center justify-center" style={{ color: chip.text }}>
              {chip.amount}
            </div>
          </div>
        );
      })}
    </div>
  );
}

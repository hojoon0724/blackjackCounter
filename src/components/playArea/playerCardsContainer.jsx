import { motion, AnimatePresence } from 'framer-motion';
import PlayerHand from './components/playerHand';
import { useContext } from 'react';
import { GameContext } from '../../pages/home';
import style from './playerCardsContainer.module.css';
import { ChipVector } from '../ui/chipVector';
// import { ChipVector } from '../ui/chipVector';
import { chipsObject } from '../../gameLogic/chipsObject';
import { getBettingChipsArray } from '../../gameLogic/chipsObject';
import { ChipOnTableVector } from '../ui/chipOnTableVector';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function PlayerCardsContainer() {
  const { playerCards, betAmount, setBetAmount, setBank, winningsArray, gameInProgress } = useContext(GameContext);

  function processBet(amount) {
    console.log(amount);
  }

  let chipsArray = [
    {
      amount: 1000,
      label: '1k',
      color: '#ffe62b',
      text: 'black',
    },
    {
      amount: 1000,
      label: '1k',
      color: '#ffe62b',
      text: 'black',
    },
    {
      amount: 1000,
      label: '1k',
      color: '#ffe62b',
      text: 'black',
    },
    {
      amount: 500,
      label: 500,
      color: '#6d00e2',
      text: 'white',
    },
    {
      amount: 100,
      label: 100,
      color: '#4a4a4a',
      text: 'white',
    },
    {
      amount: 50,
      label: 50,
      color: '#000d9f',
      text: 'white',
    },
    {
      amount: 25,
      label: 25,
      color: '#1e6f00',
      text: 'white',
    },
    {
      amount: 10,
      label: 10,
      color: '#fc8814',
      text: 'black',
    },
    {
      amount: 5,
      label: 5,
      color: '#ff3a3a',
      text: 'black',
    },
    {
      amount: 1,
      label: 1,
      color: '#e8e8e8',
      text: 'black',
    },
  ];

  return (
    <div className="player-container">
      <div className={`${style['player-hand']} flex-row justify-center`}>
        {playerCards.map((hand, handIndex) => (
          <div className="player-cards-container" id={handIndex} key={handIndex}>
            <PlayerHand hand={hand} handIndex={handIndex} handBet={winningsArray[handIndex]} />
          </div>
        ))}
      </div>
      <div className="player-bet-container flex-row justify-center align-center">
        <AnimatePresence>
          {gameInProgress ? (
            <motion.div
              transition={{
                duration: 0.3,
                ease: 'circInOut',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={'playerBetPerHand'}
              className="player-bet-value"
            ></motion.div>
          ) : (
            <motion.div
              key={'playerBetPerHand'}
              transition={{
                duration: 0.3,
                ease: 'circInOut',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="player-bet-value"
            >
              {USDollar.format(betAmount)}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="player-chip-area flex-row align-center">
          <div className="chip-stack flex-row align-center justify-center">
            {Object.entries(chipsArray).map(([key, chip]) => {
              return (
                <div
                  className={`${style['betting-chip-on-table']} bet-${chip.amount}`}
                  key={`betting-chip-on-table-${chip.amount}`}
                  style={{ bottom: `${key * 2.5 - 10}px` }}
                >
                  {console.log(key)}
                  <ChipOnTableVector textColor={chip.text} fillColor={chip.color} amount={chip.amount} />
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {gameInProgress ? (
            <motion.div
              transition={{
                duration: 0.3,
                ease: 'circInOut',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="player-bet-reset-container"
              key={'playerResetButton'}
            ></motion.div>
          ) : (
            <motion.div
              transition={{
                duration: 0.3,
                ease: 'circInOut',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="player-bet-reset-container"
              key={'playerResetButton'}
            >
              <motion.button
                className="player-bet-reset small-button"
                disabled={betAmount <= 0 ? true : false}
                onClick={() => {
                  let lastBet = betAmount;
                  setBetAmount(0);
                  setBank(prevAmt => prevAmt + lastBet);
                }}
              >
                Clear Bet
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

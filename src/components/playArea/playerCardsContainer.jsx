import { motion, AnimatePresence } from 'framer-motion';
import PlayerHand from './components/playerHand';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../pages/home';
import style from './playerCardsContainer.module.css';
import { chipsObject } from '../../gameLogic/chipsObject';
import { getChipsBreakdownObject, getChipsStackArray } from '../../gameLogic/chipsObject';
import { ChipOnTableVector } from '../ui/chipOnTableVector';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function PlayerCardsContainer() {
  const { playerCards, betAmount, setBetAmount, setBank, winningsArray, gameInProgress } = useContext(GameContext);

  const [chipsStackArray, setChipsStackArray] = useState([]);

  useEffect(() => {
    setChipsStackArray(getChipsStackArray(getChipsBreakdownObject(betAmount)));
  }, [betAmount]);

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
            {chipsStackArray.map((chip, i) => {
              return (
                <div
                  className={`${style['betting-chip-on-table']} bet-${chip}`}
                  key={`betting-chip-on-table-${chip}-${i}`}
                  style={{ bottom: `${i * 3 - 10}px` }}
                >
                  <ChipOnTableVector
                    textColor={chipsObject[chip].text}
                    fillColor={chipsObject[chip].color}
                    amount={chipsObject[chip].amount}
                  />
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

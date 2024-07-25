import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { getHandsSumString } from '../../../gameLogic/mathFunctions';
import Card from './card';
import { GameContext } from '../../../pages/home';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function PlayerHand({ hand, handIndex, handBet }) {
  const [handValSum, setHandValSum] = useState(0);
  const { currentHandIndex, gameInProgress, handOutcomes } = useContext(GameContext);

  useEffect(() => {
    let newHandValSum = getHandsSumString(hand);
    const timeoutId = setTimeout(() => {
      setHandValSum(newHandValSum);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [hand]);

  return (
    <>
      <motion.div
        className="player-hand-bet-amount"
        transition={{ duration: 0.5, ease: 'circInOut' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {gameInProgress ? `${handOutcomes[handIndex]}: ${USDollar.format(handBet)}` : `${handOutcomes[handIndex]}`}
      </motion.div>
      <motion.div
        className="player-card-value"
        transition={{ duration: 0.5, ease: 'circInOut' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {handIndex <= currentHandIndex ? handValSum : ''}
      </motion.div>
      {hand.map((card, cardIndex) => (
        <Card card={card} cardIndex={cardIndex} key={`${card.name}-${card.deckNum}`} />
      ))}
    </>
  );
}

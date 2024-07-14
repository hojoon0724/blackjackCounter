import { motion } from 'framer-motion';
import { sumWithAce } from './gameLogic/calculations';
import { useState, useEffect } from 'react';

export default function PlayerCardsContainer({ playerCards }) {
  const [cardValSum, setCardValSum] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCardValSum(sumWithAce(playerCards));
    }, 1000);
    console.log(timeoutId);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [playerCards]);

  return (
    <div className="player-container">
      <div className="player-cards-container">
        {playerCards.map((card, index) => {
          return (
            <motion.div
              className="face-down-card"
              transition={{ duration: 0.5, delay: index < 2 ? index * 0.5 + 0.2 : 0, ease: 'circInOut' }}
              initial={{ opacity: 0, perspective: 1000 }}
              animate={{ opacity: 1, perspective: 1000 }}
              exit={{ opacity: 0, duration: 0.5 }}
              key={`${card.name}-${index}`}
              style={{ transform: `translateX(${25 * index}%) translateY(${-117.85 * index}%)` }}
            >
              <motion.div
                className="card-container"
                transition={{ duration: 0.5, delay: index < 2 ? index * 0.5 + 0.2 : 0.3, ease: 'circInOut' }}
                initial={{ rotateY: 180, perspective: 1000 }}
                animate={{ rotateY: 0, perspective: 1000 }}
              >
                <motion.img
                  className="front"
                  transition={{ duration: 0.5, delay: index < 2 ? index * 0.5 + 0.2 : 0.3, ease: 'circInOut' }}
                  initial={{ display: 'none', opacity: 1, rotateY: 180, perspective: 1000 }}
                  animate={{ display: 'block', opacity: 1, rotateY: 0, perspective: 1000 }}
                  key={card.name}
                  src={card.cardSvg}
                  alt={card.name}
                  style={{ position: 'absolute' }}
                ></motion.img>

                <motion.img
                  className="back"
                  transition={{ duration: 0.5, delay: index < 2 ? index * 0.5 + 0.2 : 0.3, ease: 'circInOut' }}
                  initial={{ rotateY: 0, opacity: 1 }}
                  animate={{ rotateY: 180, opacity: 1 }}
                  src="./SVGs/00-back.svg"
                  alt={'card back side'}
                ></motion.img>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="player-bet-container flex-row justify-center align-center">
        <div className="player-card-value">{cardValSum}</div>
        <div className="player-chip-area"></div>
        <div className="player-bet-value"></div>
      </div>
    </div>
  );
}

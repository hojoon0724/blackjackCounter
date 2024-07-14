import { motion } from 'framer-motion';
import { sumValues } from './gameLogic/calculations';
import { useState, useEffect } from 'react';

export default function DealerCardsContainer({ dealerCards, hiddenCard, gameInProgress }) {
  const [containerWidth, setContainerWidth] = useState('calc(var(--card-width) + 1.5svh)');
  const [cardValSum, setCardValSum] = useState(0);

  useEffect(() => {
    const cardWidth = `calc(var(--card-width) + 1.5svh)`;
    const newWidth = `calc(${cardWidth} * ${dealerCards.length})`;
    setContainerWidth(newWidth);
  }, [dealerCards.length]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCardValSum(sumValues(dealerCards));
    }, 750);
    console.log(timeoutId);
    return () => clearTimeout(timeoutId);
  }, [hiddenCard, dealerCards]);

  if (dealerCards.length > 0) {
    return (
      <div className="dealer-container">
        <motion.div
          className="dealer-cards-container"
          animate={{ width: `min(100svw, ${containerWidth}` }}
          transition={{ duration: 0.25 }}
          style={{ boxSizing: 'content-box' }}
        >
          <motion.div
            className="face-down-card"
            transition={{ duration: hiddenCard ? 0 : 0.5, ease: 'circInOut' }}
            initial={{ duration: 0, rotateY: 180, perspective: 1000, opacity: 0 }}
            animate={{ rotateY: hiddenCard ? 180 : 0, perspective: 1000, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-container"
              transition={{ duration: hiddenCard ? 0 : 0.5, ease: 'circInOut', perspective: 1000 }}
              initial={{ rotateY: 180, perspective: 1000 }}
              animate={{ rotateY: 0, perspective: 1000 }}
            >
              <motion.img
                className="front"
                transition={{ duration: hiddenCard ? 0 : 0.5, ease: 'circInOut' }}
                initial={{ rotateY: 0, perspective: 1000 }}
                animate={{ rotateY: hiddenCard ? 180 : 0, perspective: 1000 }}
                src={dealerCards[0].cardSvg}
                alt={dealerCards[0].name}
                style={{ position: 'absolute' }}
              ></motion.img>

              <motion.img
                className="back"
                transition={{ duration: hiddenCard ? 0 : 0.5, ease: 'circInOut' }}
                initial={{ rotateY: 180, opacity: 0, perspective: 1000 }}
                animate={{ rotateY: hiddenCard ? 0 : 180, opacity: 1, perspective: 1000 }}
                exit={{ opacity: 0 }}
                src="./SVGs/00-back.svg"
                alt={'card back side'}
              ></motion.img>
            </motion.div>
          </motion.div>

          {dealerCards.slice(1).map((card, index) => {
            return (
              <motion.div
                className="face-down-card"
                transition={{ duration: 0.5, delay: 0, ease: 'circInOut' }}
                initial={{ opacity: 0, perspective: 1000 }}
                animate={{ opacity: 1, perspective: 1000 }}
                key={`${card.name}-${index}`}
              >
                <motion.div
                  className="card-container"
                  transition={{ duration: 0.5, delay: 0.3, ease: 'circInOut' }}
                  initial={{ rotateY: 180, perspective: 1000 }}
                  animate={{ rotateY: 0, perspective: 1000 }}
                >
                  <motion.img
                    className="front"
                    transition={{ duration: 0.5, delay: 0.3, ease: 'circInOut' }}
                    initial={{ display: 'none', opacity: 1, rotateY: 180, perspective: 1000 }}
                    animate={{ display: 'block', opacity: 1, rotateY: 0, perspective: 1000 }}
                    key={card.name}
                    src={card.cardSvg}
                    alt={card.name}
                    style={{ position: 'absolute' }}
                  ></motion.img>

                  <motion.img
                    className="back"
                    transition={{ duration: 0.5, delay: 0.3, ease: 'circInOut' }}
                    initial={{ rotateY: 0, opacity: 1 }}
                    animate={{ rotateY: 180, opacity: 1 }}
                    src="./SVGs/00-back.svg"
                    alt={'card back side'}
                  ></motion.img>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="dealer-number-container flex-row justify-center align-center">
          <div className="dealer-card-value">{hiddenCard ? '' : cardValSum}</div>
        </div>
      </div>
    );
  } else {
    return <div className="dealer-container" style={{ width: 'var(--card-width)', height: 'var(--card-height' }}></div>;
  }
}

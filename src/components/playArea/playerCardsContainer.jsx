import { AnimatePresence, motion } from 'framer-motion';
import { sumWithAce } from '../../gameLogic/calculations';
import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function PlayerCardsContainer() {
  // console.log('player cards', playerCards);
  // playerCards.map((hand, handIndex) => {
  //   console.log('hand', hand);
  //   console.log('hand index', handIndex);
  //   hand.map((card, cardIndex) => {
  //     console.log('print card object', card);
  //     console.log('print card index', cardIndex);
  //     console.log(handIndex, cardIndex);
  //   });
  // });
  const { playerCards } = useContext(GameContext);

  const [cardValSum, setCardValSum] = useState([0]);
  const [cardsAreShowing, setCardsAreShowing] = useState(false);

  useEffect(() => {
    let allHandsValuesArray = [];
    for (let index in playerCards) {
      let handValSum = sumWithAce(playerCards[index]);
      allHandsValuesArray.push(handValSum);
    }
    const timeoutId = setTimeout(() => {
      setCardValSum(allHandsValuesArray, 0);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [playerCards]);

  useEffect(() => {
    if (playerCards[0].length > 0) {
      setCardsAreShowing(true);
    } else {
      setCardsAreShowing(false);
    }
  }, [playerCards]);

  return (
    <div className="player-container">
      <div className="player-hand flex-row ">
        <AnimatePresence>
          {playerCards.map((hand, handIndex) => {
            return (
              <div className="player-cards-container " id={handIndex} key={handIndex}>
                <motion.div
                  className="player-card-value"
                  transition={{ duration: 0.5, ease: 'circInOut' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {cardsAreShowing ? cardValSum[handIndex] : ''}
                </motion.div>
                {hand.map((card, cardIndex) => {
                  return (
                    <motion.div
                      className="face-down-card"
                      transition={{
                        duration: 0.5,
                        delay: cardIndex < 2 ? cardIndex * 0.5 + 0.2 : 0,
                        ease: 'circInOut',
                      }}
                      initial={{ opacity: 0, perspective: 1000 }}
                      animate={{ opacity: 1, perspective: 1000 }}
                      exit={{ opacity: 0, duration: 0.5 }}
                      key={`${card.name}-${cardIndex}`}
                      style={{ transform: `translateX(${25 * cardIndex}%) translateY(${-117.85 * cardIndex}%)` }}
                    >
                      <motion.div
                        className="card-container"
                        transition={{
                          duration: 0.5,
                          delay: cardIndex < 2 ? cardIndex * 0.5 + 0.2 : 0.3,
                          ease: 'circInOut',
                        }}
                        initial={{ rotateY: 180, perspective: 1000 }}
                        animate={{ rotateY: 0, perspective: 1000 }}
                      >
                        <motion.img
                          className="front"
                          transition={{
                            duration: 0.5,
                            delay: cardIndex < 2 ? cardIndex * 0.5 + 0.2 : 0.3,
                            ease: 'circInOut',
                          }}
                          initial={{ display: 'none', opacity: 1, rotateY: 180, perspective: 1000 }}
                          animate={{ display: 'block', opacity: 1, rotateY: 0, perspective: 1000 }}
                          key={card.name}
                          src={card.cardSvg}
                          alt={card.name}
                          style={{ position: 'absolute' }}
                        ></motion.img>
                        <motion.img
                          className="back"
                          transition={{
                            duration: 0.5,
                            delay: cardIndex < 2 ? cardIndex * 0.5 + 0.2 : 0.3,
                            ease: 'circInOut',
                          }}
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
            );
          })}
        </AnimatePresence>
      </div>
      <div className="player-bet-container flex-row justify-center align-center">
        <div className="player-chip-area"></div>
        <div className="player-bet-value"></div>
      </div>
    </div>
  );
}

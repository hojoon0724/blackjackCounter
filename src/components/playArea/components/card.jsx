import { motion } from 'framer-motion';

export default function Card({ hand }) {
  const cardOffsetPercentage = 20;

  return (
    <>
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
            style={{
              transform: `translateX(${cardOffsetPercentage * cardIndex}%) translateY(${
                (cardOffsetPercentage * -0.714 - 100) * cardIndex
              }%)`,
            }}
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
                src="./assets/SVGs/00-back.svg"
                alt={'card back side'}
              ></motion.img>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

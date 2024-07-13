import { motion } from 'framer-motion';

export default function DealerCardsContainer({ dealerCards, hiddenCard }) {
  if (dealerCards.length > 0) {
    return (
      <div className="dealer-cards-container">
        <motion.div
          className="card"
          transition={{ duration: hiddenCard ? 0 : 0.7 }}
          initial={{ rotateY: 180, perspective: 1000 }}
          animate={{ rotateY: hiddenCard ? 180 : 0, perspective: 1000 }}
        >
          <motion.div
            className="card-container"
            transition={{ duration: 0.7 }}
            // animate={{ rotateY: hiddenCard ? 0 : 180 }}
          >
            <motion.img
              className="front"
              transition={{ duration: 0.7 }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: hiddenCard ? 180 : 0 }}
              src={dealerCards[0].cardSvg}
              alt={dealerCards[0].name}
              style={{ position: 'absolute' }}
            ></motion.img>

            <motion.img
              className="back"
              transition={{ duration: hiddenCard ? 0 : 0.7 }}
              initial={{ rotateY: 180, opacity: 1 }}
              animate={{ rotateY: hiddenCard ? 0 : 180 }}
              src="./SVGs/00-back.svg"
              alt={'card back side'}
            ></motion.img>
          </motion.div>
        </motion.div>

        {dealerCards.slice(1).map((card, index) => {
          return (
            <motion.img
              className="card"
              transition={{ duration: 0.5, delay: index < 1 ? index * 0.5 + 0.7 : 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={card.name}
              src={card.cardSvg}
              alt={card.name}
            />
          );
        })}
      </div>
    );
  } else {
  }
}

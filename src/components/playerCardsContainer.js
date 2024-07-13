import { motion } from 'framer-motion';

export default function DealerCardsContainer({ playerCards }) {
  return (
    <div className="player-cards-container">
      {playerCards.map((card, index) => {
        return (
          <motion.img
            className="card"
            transition={{ duration: 0.5, delay: index < 2 ? index * 0.5 + 0.2 : 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={card.name}
            src={card.cardSvg}
            alt={card.name}
            style={{ transform: `translateX(${25 * index}%) translateY(${-17.85 * index}%)` }}
          />
        );
      })}
    </div>
  );
}

// return (
// <motion.div
//   key={index}
//   className="card"
//   transition={{ duration: 0.7 }}
//   initial={{ rotateY: 180, x: translateXPercent, y: translateYPercent, perspective: 1000 }}
//   animate={{ rotateY: 0, x: translateXPercent, y: translateYPercent, perspective: 1000 }}
// >
//   <motion.div
//     className="card-container"
//     transition={{ duration: 0.7 }}
//     initial={{ rotateY: 180 }}
//     animate={{ rotateY: 0 }}
//   >
//     <motion.img
//       className="front"
//       transition={{ duration: 0.7 }}
//       initial={{ rotateY: 180, opacity: 1 }}
//       animate={{ rotateY: 0, opacity: 1 }}
//       src={card.cardSvg}
//       alt={card.name}
//     >
//       {/* <img className="card-front" src={card.cardSvg} alt={card.name} /> */}
//     </motion.img>

//     <motion.img
//       className="back"
//       transition={{ duration: 0.7 }}
//       initial={{ rotateY: 0, opacity: 1 }}
//       animate={{ rotateY: 180, opacity: 1 }}
//       src="./SVGs/00-back.svg"
//       alt={'card back side'}
//     >
//       {/* <img className="card-back" src="./SVGs/00-back.svg" alt={'card back side'} /> */}
//     </motion.img>
//   </motion.div>
// </motion.div>
// );

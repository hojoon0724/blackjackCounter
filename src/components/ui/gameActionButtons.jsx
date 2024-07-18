import { motion } from 'framer-motion';
import { GameContext } from '../../pages/home';
import { useContext } from 'react';

export default function GameActionButtons() {
  const { actions, gameInProgress, handIndex } = useContext(GameContext);

  if (gameInProgress) {
    return (
      <motion.div animate={{ opacity: gameInProgress ? 1 : 0 }} className="actions-container flex-row">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.split.disabled}
          className="action-button action-split"
          onClick={actions.split.func(handIndex)}
        >
          Split
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.double.disabled}
          className="action-button action-double"
          onClick={actions.double.func(handIndex)}
        >
          Double
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.hit.disabled}
          className="action-button action-hit"
          onClick={actions.hit.func(handIndex)}
        >
          Hit
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.stand.disabled}
          className="action-button action-stand"
          onClick={actions.stand.func(handIndex)}
        >
          Stand
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.surrender.disabled}
          className="action-button action-surrender"
          onClick={actions.surrender.func}
        >
          Surrender
        </motion.button>
      </motion.div>
    );
  } else {
    return (
      <motion.div animate={{ display: gameInProgress ? 0 : 1 }} className="actions-container flex-row">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.deal.disabled}
          className="deal-button"
          onClick={actions.deal.func}
        >
          Deal
        </motion.button>
      </motion.div>
    );
  }
}

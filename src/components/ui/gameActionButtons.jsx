import { motion } from 'framer-motion';
import { GameContext } from '../../pages/home';
import { useContext } from 'react';

export default function GameActionButtons() {
  const { actions, gameInProgress, currentHandIndex } = useContext(GameContext);
  const animationButton = {
    tapScale: 0.95,
    hoverScale: 1.05,
    duration: 0.1,
  };

  if (gameInProgress) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: gameInProgress ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        exit={{ opacity: 0 }}
        className="actions-container flex-row"
      >
        <motion.button
          whileTap={{ scale: animationButton.tapScale }}
          whileHover={{ scale: animationButton.hoverScale }}
          transition={{ duration: animationButton.duration }}
          disabled={actions.split.disabled}
          className="action-button action-split"
          onClick={actions.split.func(currentHandIndex)}
        >
          Split
        </motion.button>
        <motion.button
          whileTap={{ scale: animationButton.tapScale }}
          whileHover={{ scale: animationButton.hoverScale }}
          transition={{ duration: animationButton.duration }}
          disabled={actions.double.disabled}
          className="action-button action-double"
          onClick={actions.double.func(currentHandIndex)}
        >
          Double
        </motion.button>
        <motion.button
          whileTap={{ scale: animationButton.tapScale }}
          whileHover={{ scale: animationButton.hoverScale }}
          transition={{ duration: animationButton.duration }}
          disabled={actions.hit.disabled}
          className="action-button action-hit"
          onClick={actions.hit.func(currentHandIndex)}
        >
          Hit
        </motion.button>
        <motion.button
          whileTap={{ scale: animationButton.tapScale }}
          whileHover={{ scale: animationButton.hoverScale }}
          transition={{ duration: animationButton.duration }}
          disabled={actions.stand.disabled}
          className="action-button action-stand"
          onClick={actions.stand.func(currentHandIndex)}
        >
          Stand
        </motion.button>
        <motion.button
          whileTap={{ scale: animationButton.tapScale }}
          whileHover={{ scale: animationButton.hoverScale }}
          transition={{ duration: animationButton.duration }}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: gameInProgress ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        exit={{ opacity: 0 }}
        className="actions-container flex-row"
      >
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

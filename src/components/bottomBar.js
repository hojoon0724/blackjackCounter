import { motion } from 'framer-motion';
import './bottomBar.css';

export default function BottomBar({ mitCount, actions }) {
  return (
    <div className="bottom-bar flex-row space-between">
      <div className="mit-count-container flex-row">
        <div className="mit-count-label">Count: </div>
        <div className="mit-count-value">{mitCount}</div>
      </div>
      <div className="actions-container flex-row">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.split.disabled}
          className="action-button action-split"
          onClick={actions.split.func}
        >
          Split
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.double.disabled}
          className="action-button action-double"
          onClick={actions.double.func}
        >
          Double
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.hit.disabled}
          className="action-button action-hit"
          onClick={actions.hit.func}
        >
          Hit
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.stand.disabled}
          className="action-button action-stand"
          onClick={actions.stand.func}
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
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          className="action-button"
          onClick={actions.printArray.func}
        >
          Print Pile
        </motion.button>
      </div>
      <div className="deal-button-container flex-row">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          disabled={actions.deal.disabled}
          className="deal-button"
          onClick={actions.deal.func}
        >
          Deal
        </motion.button>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { GameContext } from '../../pages/home';
import { useContext } from 'react';
import { BettingBar } from './bettingBar';

const animationButton = {
  tapScale: 0.95,
  hoverScale: 1.05,
  duration: 0.1,
};

export function HandActionButton({ actionName, actionLabel }) {
  const { actions, currentHandIndex } = useContext(GameContext);
  return (
    <motion.button
      whileTap={{ scale: animationButton.tapScale }}
      whileHover={{ scale: animationButton.hoverScale }}
      transition={{ duration: animationButton.duration }}
      disabled={actions[actionName].disabled}
      className={`action-button action-${actionName}`}
      onClick={actions[actionName].func(currentHandIndex)}
    >
      {actionLabel}
    </motion.button>
  );
}

export function ActionButton({ actionName, actionLabel }) {
  const { actions } = useContext(GameContext);

  return (
    <motion.button
      whileTap={{ scale: animationButton.tapScale }}
      whileHover={{ scale: animationButton.hoverScale }}
      transition={{ duration: animationButton.duration }}
      disabled={actions[actionName].disabled}
      className={`action-button action-${actionName}`}
      onClick={actions[actionName].func}
    >
      {actionLabel}
    </motion.button>
  );
}

export function ActionContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0 }}
      className="actions-container flex-row"
    >
      {children}
    </motion.div>
  );
}

export function InGameActions() {
  return (
    <ActionContainer>
      <HandActionButton actionName={'split'} actionLabel={'split'} />
      <HandActionButton actionName={'double'} actionLabel={'double'} />
      <HandActionButton actionName={'hit'} actionLabel={'hit'} />
      <HandActionButton actionName={'stand'} actionLabel={'stand'} />
      <ActionButton actionName={'surrender'} actionLabel={'surrender'} />
    </ActionContainer>
  );
}

export function AskInsurance() {
  return (
    <ActionContainer>
      <div className="insurance-text flex-row align-center">Insurance? &nbsp;&nbsp;</div>
      <ActionButton actionName={'payInsurance'} actionLabel={'Yes'} />
      <ActionButton actionName={'refuseInsurance'} actionLabel={'No'} />
      {/* <BettingBar /> */}
    </ActionContainer>
  );
}

export function Deal() {
  return (
    <ActionContainer>
      <BettingBar />
      <ActionButton actionName={'deal'} actionLabel={'deal'} />
    </ActionContainer>
  );
}

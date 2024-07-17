import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function ShuffleButton() {
  const { actions } = useContext(GameContext);

  return (
    <div className="shuffle-container">
      <button className="action-button shuffle-button" onClick={actions.resetDeck.func}>
        Shuffle
      </button>
    </div>
  );
}

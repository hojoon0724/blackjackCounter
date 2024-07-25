import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function ShuffleButton() {
  const { actions } = useContext(GameContext);

  return (
    <>
      <div className="setting-name">Reset Table</div>
      <div className="shuffle-container">
        <button className="small-button shuffle-button" onClick={actions.resetDeck.func}>
          Reset
        </button>
      </div>
    </>
  );
}

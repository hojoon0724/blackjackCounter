import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function ResetAllStats() {
  const { actions } = useContext(GameContext);

  return (
    <>
      <div className="setting-name">Reset Everything</div>
      <div className="shuffle-container">
        <button className="small-button shuffle-button" onClick={actions.resetAllStats.func}>
          Reset Everything
        </button>
      </div>
    </>
  );
}

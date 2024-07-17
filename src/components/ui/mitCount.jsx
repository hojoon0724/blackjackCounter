import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function MitCount() {
  const { mitCount } = useContext(GameContext);
  return (
    <div className="mit-count-container flex-row align-center">
      <div className="mit-count-label">Count: </div>
      <div className="mit-count-value">{mitCount}</div>
    </div>
  );
}

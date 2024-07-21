import './topBar.css';

import { GameContext } from '../../pages/home';
import { useContext } from 'react';

export default function TopBar() {
  const { setSettingsModalIsOpen, bank } = useContext(GameContext);

  return (
    <div className="top-bar flex-row space-between align-center">
      <div className="app-name">Blackjack Counter</div>
      <button className="action-button settings-button" onClick={() => setSettingsModalIsOpen(true)}>
        Settings
      </button>
    </div>
  );
}

import { useContext } from 'react';
import { GameContext } from '../../pages/home';

import DeckAmountInput from './deckAmountInput';
import ShuffleButton from './shuffleButton';

export default function Settings() {
  const { settingsModalIsOpen, setSettingsModalIsOpen } = useContext(GameContext);

  if (settingsModalIsOpen) {
    return (
      <div className="settings-container flex-column align-center justify-center">
        <div className="setting-row flex-row align-center">
          <DeckAmountInput />
        </div>
        <div className="setting-row flex-row align-center">
          <ShuffleButton />
        </div>
        <button className="close-settings-modal" onClick={() => setSettingsModalIsOpen(false)}>
          Close
        </button>
      </div>
    );
  }
}

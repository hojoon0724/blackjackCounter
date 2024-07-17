import { useContext } from 'react';
import DeckAmountInput from './deckAmountInput';
import { GameContext } from '../../pages/home';

export default function Settings() {
  const { settingsModalIsOpen, setSettingsModalIsOpen } = useContext(GameContext);

  if (settingsModalIsOpen) {
    return (
      <div className="settings-container flex-column align-center justify-center">
        <div className="setting-row flex-row align-center">
          <DeckAmountInput />
        </div>
        <button className="close-settings-modal" onClick={() => setSettingsModalIsOpen(false)}>
          Close
        </button>
      </div>
    );
  }
}

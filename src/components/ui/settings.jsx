import { useContext } from 'react';
import { GameContext } from '../../pages/home';
import DeckAmountInput from './deckAmountInput';

export default function Settings() {
  const { deckAmount, setDeckAmount } = useContext(GameContext);

  return (
    <div className="settings-container">
      <DeckAmountInput />
    </div>
  );
}

import DealerCardsContainer from './dealerCardsContainer';
import PlayerCardsContainer from './playerCardsContainer';
import DevButtons from '../devTools/devButtons';
import './playArea.css';
import Settings from '../ui/settings';
import '../ui/settings.css';
import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function PlayArea() {
  const { settingsModalIsOpen } = useContext(GameContext);

  return (
    <>
      {settingsModalIsOpen ? <Settings /> : <></>}
      <DevButtons />
      <div className="play-area flex-column align-center">
        <DealerCardsContainer />
        <PlayerCardsContainer />
      </div>
    </>
  );
}

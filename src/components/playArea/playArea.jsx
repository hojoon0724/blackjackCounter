import DealerCardsContainer from './dealerCardsContainer';
import PlayerCardsContainer from './playerCardsContainer';
import DevButtons from '../devTools/devButtons';
import './playArea.css';
import Settings from '../ui/settings';
import '../ui/settings.css';

export default function PlayArea() {
  return (
    <>
      <DevButtons />
      <div className="play-area flex-column align-center">
        <div className="settings-modal">
          <Settings />
        </div>
        <DealerCardsContainer />
        <PlayerCardsContainer />
      </div>
    </>
  );
}

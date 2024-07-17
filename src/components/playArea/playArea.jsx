import DealerCardsContainer from './dealerCardsContainer';
import PlayerCardsContainer from './playerCardsContainer';
import DevButtons from '../devTools/devButtons';
import './playArea.css';

export default function PlayArea() {
  return (
    <>
      <DevButtons />
      <div className="play-area flex-column align-center">
        <DealerCardsContainer />
        <PlayerCardsContainer />
      </div>
    </>
  );
}

import './bottomBar.css';
import GameActionButtons from './gameActionButtons';
import MitCount from './mitCount';
import ShuffleButton from './shuffleButton';

export default function BottomBar() {
  return (
    <div className="bottom-bar flex-row">
      <MitCount />
      <GameActionButtons />
      <ShuffleButton />
    </div>
  );
}

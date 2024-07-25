import './bottomBar.css';
import BottomBarActionsContainer from './bottomBarActionsContainer';

export default function BottomBar() {
  return (
    <div className="bottom-bar-container">
      <div className="bottom-bar flex-row">
        <BottomBarActionsContainer />
      </div>
    </div>
  );
}

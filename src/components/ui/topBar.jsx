import './topBar.css';
// import { GameContext } from '../pages/home';
// import { useContext } from 'react';

export default function TopBar() {
  // const { mitCount } = useContext(GameContext);

  return (
    <div className="top-bar flex-row space-between align-center">
      <div className="app-name">Blackjack Counter</div>
      <button className="settings-button">Settings</button>
    </div>
  );
}

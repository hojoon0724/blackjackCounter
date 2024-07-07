import './playArea.css';

export default function PlayArea() {
  return (
    <div className="play-area flex-column align-center">
      <div className="dealer-container flex-row justify-center">
        <div className="dealer-cards-container">
          <img className="card" src="./SVGs/02-01.svg" />
          <img className="card" src="./SVGs/02-02.svg" />
          <img className="card" src="./SVGs/02-04.svg" />
        </div>
      </div>
      <div className="player-container">
        <div className="player-cards-container">
          <img className="card" src="./SVGs/01-12q.svg" />
          <img className="card" src="./SVGs/01-01.svg" />
        </div>
        <div className="player-bet-container flex-row justify-center align-center">
          <div className="player-chip-area"></div>
          <div className="player-bet-value">$100</div>
        </div>
      </div>
    </div>
  );
}

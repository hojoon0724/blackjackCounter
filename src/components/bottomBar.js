import './bottomBar.css';

export default function BottomBar() {
  return (
    <div className="bottom-bar flex-row space-between">
      <div className="mit-count-container flex-row">
        <div className="mit-count-label">Count: </div>
        <div className="mit-count-value">0</div>
      </div>
      <div className="actions-container flex-row">
        <button disabled className="action-button action-split">
          Split
        </button>
        <button disabled className="action-button action-double">
          Double
        </button>
        <button enabled className="action-button action-hit">
          Hit
        </button>
        <button disabled className="action-button action-stand">
          Stand
        </button>
        <button disabled className="action-button action-surrender">
          Surrender
        </button>
      </div>
      <div className="deal-button-container flex-row">
        <button className="deal-button">Deal</button>
      </div>
    </div>
  );
}

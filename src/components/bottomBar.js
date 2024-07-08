import './bottomBar.css';

export default function BottomBar({ mitCount, actions }) {
  return (
    <div className="bottom-bar flex-row space-between">
      <div className="mit-count-container flex-row">
        <div className="mit-count-label">Count: </div>
        <div className="mit-count-value">{mitCount}</div>
      </div>
      <div className="actions-container flex-row">
        <button disabled={false} className="action-button action-split" onClick={actions.split}>
          Split
        </button>
        <button disabled={false} className="action-button action-double" onClick={actions.double}>
          Double
        </button>
        <button disabled={false} className="action-button action-hit" onClick={actions.hit}>
          Hit
        </button>
        <button disabled={false} className="action-button action-stand" onClick={actions.stand}>
          Stand
        </button>
        <button disabled={false} className="action-button action-surrender" onClick={actions.surrender}>
          Surrender
        </button>
      </div>
      <div className="deal-button-container flex-row">
        <button className="deal-button" onClick={actions.deal}>
          Deal
        </button>
      </div>
    </div>
  );
}

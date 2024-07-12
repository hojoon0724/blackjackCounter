import './bottomBar.css';

export default function BottomBar({ mitCount, actions }) {
  return (
    <div className="bottom-bar flex-row space-between">
      <div className="mit-count-container flex-row">
        <div className="mit-count-label">Count: </div>
        <div className="mit-count-value">{mitCount}</div>
      </div>
      <div className="actions-container flex-row">
        <button
          disabled={actions.split.disabled}
          className="action-button action-split"
          onClick={actions.split.func}
        >
          Split
        </button>
        <button
          disabled={actions.double.disabled}
          className="action-button action-double"
          onClick={actions.double.func}
        >
          Double
        </button>
        <button
          disabled={actions.hit.disabled}
          className="action-button action-hit"
          onClick={actions.hit.func}
        >
          Hit
        </button>
        <button
          disabled={actions.stand.disabled}
          className="action-button action-stand"
          onClick={actions.stand.func}
        >
          Stand
        </button>
        <button
          disabled={actions.surrender.disabled}
          className="action-button action-surrender"
          onClick={actions.surrender.func}
        >
          Surrender
        </button>
        <button
          className="action-button action-surrender"
          onClick={actions.printPile.func}
        >
          Print Pile
        </button>
      </div>
      <div className="deal-button-container flex-row">
        <button
          disabled={actions.deal.disabled}
          className="deal-button"
          onClick={actions.deal.func}
        >
          Deal
        </button>
      </div>
    </div>
  );
}

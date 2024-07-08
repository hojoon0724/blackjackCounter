export default function DealerCardsContainer({ playerCards }) {
  // let playerCards = [
  //   { name: '01-12Q-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-12Q.svg', deckNum: '3' },
  //   { name: '01-01-6', value: 11, mitCountValue: -1, cardSvg: './SVGs/01-01.svg', deckNum: '6' },
  // ];

  return (
    <div className="player-cards-container">
      {playerCards.map((card, index) => {
        return (
          <img
            className="card"
            key={card.name}
            src={card.cardSvg}
            alt={card.name}
            style={{ transform: `translateX(${3.5 * index}svh) translateY(${-3.5 * index}svh)` }}
          />
        );
      })}
      {/* <div className="cards-stats-test" style={{ padding: '20px' }}>
        <p>{playerCards.reduce((n, { value }) => n + value, 0)}</p>
      </div> */}
    </div>
  );
}

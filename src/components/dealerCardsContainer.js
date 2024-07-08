export default function DealerCardsContainer({ dealerCards }) {
  // let dealerCards = [
  //   { name: '04-13K-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/04-13K.svg', deckNum: '3' },
  //   { name: '02-10-6', value: 10, mitCountValue: -1, cardSvg: './SVGs/02-10.svg', deckNum: '6' },
  // ];

  return (
    <div className="dealer-cards-container">
      {dealerCards.map((card) => {
        return <img className="card" key={card.name} src={card.cardSvg} alt={card.name} />;
      })}
      {/* <div className="cards-stats-test" style={{ padding: '20px' }}>
        <p>{dealerCards.reduce((n, { value }) => n + value, 0)}</p>
      </div> */}
    </div>
  );
}

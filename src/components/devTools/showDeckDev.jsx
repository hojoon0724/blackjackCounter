export default function showDeckDev() {
  return (
    <div className="dev-deck">
      {playingDeck.map((card) => (
        <div key={`${card.name}-${card.deckNum}`} className="card-box">
          <img src={card.cardSvg} alt="" />
        </div>
      ))}
    </div>
  );
}

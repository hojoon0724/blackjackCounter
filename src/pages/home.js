import { useState } from 'react';
import cardDeckAssembly from '../components/cardAssembly';
import shuffleDeck from '../components/shuffleDeck';

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(4);
  let cardDeck = cardDeckAssembly(deckAmount);
  let playingDeck = shuffleDeck(cardDeck);

  return (
    <div className="top">
      <p>stuff goes here</p>
      {deckAmount}
      <div className="show-cards">
        {playingDeck.map((card) => (
          <div key={`${card.name}-${card.deckNum}`} className="card-box">
            <img src={card.cardSvg} alt="" />
            {/* <p>
              {`{`} <br />
              {`name: `}
              {card.name}
              <br />
              {`value: `}
              {card.value}
              <br />
              {`mitCountValue: `}
              {card.mitCountValue}
              <br />
              {`cardSvg: `}
              {card.cardSvg}
              <br />
              {`deckNum: `}
              {card.deckNum}
              <br />
              {`}`}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

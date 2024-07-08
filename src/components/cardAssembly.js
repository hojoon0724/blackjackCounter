export default function cardDeckAssembly(deckAmount) {
  const suits = ['01', '02', '03', '04'];
  const cardNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11J', '12Q', '13K'];

  let cardDeck = [];

  let cardObject = {
    name: '',
    value: '',
    mitCountValue: 0,
    cardSvg: '',
    deckNum: 0,
  };

  function makeDeck(deckAmount) {
    let repetition = deckAmount;
    for (let deckNumber = repetition; deckNumber > 0; deckNumber--) {
      suits.forEach((suit) => {
        cardNums.forEach((num, index) => {
          let cardValue = index + 1;
          let mitValue = 0;
          if (num === '11J' || num === '12Q' || num === '13K') {
            cardValue = 10;
          }

          if (cardValue > 1 && cardValue < 7) {
            mitValue = 1;
          } else if (cardValue === 1 || cardValue === 10) {
            mitValue = -1;
          }

          cardObject = {
            name: `${suit}-${num}-${deckNumber}`,
            value: cardValue,
            mitCountValue: mitValue,
            cardSvg: `./SVGs/${suit}-${num}.svg`,
            deckNum: `${deckNumber}`,
          };

          cardDeck.push(cardObject);
        });
      });
    }
  }

  makeDeck(deckAmount);

  return cardDeck;
}

function makeOneDeck(deckNumber) {
  const suits = ['01', '02', '03', '04'];
  const cardNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11J', '12Q', '13K'];

  let cardDeck = [];

  suits.forEach(suit => {
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

      const cardObject = {
        name: `${suit}-${num}-${deckNumber}`,
        value: cardValue,
        mitCountValue: mitValue,
        cardSvg: `/assets/SVGs/${suit}-${num}.svg`,
        deckNum: `${deckNumber}`,
      };

      cardDeck.push(cardObject);
    });
  });
  return cardDeck;
}

function cardDeckAssembly(deckAmount) {
  return Array.from({ length: deckAmount }, (_, index) => makeOneDeck(index + 1)).flat();
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function getNewDeck(deckAmount) {
  const newShuffledDeck = shuffleDeck(cardDeckAssembly(deckAmount));
  return newShuffledDeck;
}

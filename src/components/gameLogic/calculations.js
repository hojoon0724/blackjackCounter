export function cardDeckAssembly(deckAmount) {
  const suits = ['01', '02', '03', '04'];
  const cardNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11J', '12Q', '13K'];

  let cardDeck = [];

  function makeDeck(deckAmount) {
    let repetition = deckAmount;
    for (let deckNumber = repetition; deckNumber > 0; deckNumber--) {
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

export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function sumFinalValues(cardArray) {
  const aceExists = cardArray.some(card => card.value === 1);
  const rawVal = cardArray.reduce((n, { value }) => n + value, 0);
  // console.log(cardArray.length, rawVal);
  if (cardArray.length === 2 && rawVal === 11 && aceExists) {
    return 21;
  }
  if (aceExists && rawVal + 10 < 22) {
    // console.log(`${rawVal + 10}/${rawVal}`);
    return rawVal + 10;
  } else {
    // console.log(rawVal);
    return rawVal;
  }
}

export function sumWithAce(cardArray) {
  const aceExists = cardArray.some(card => card.value === 1);
  const rawVal = cardArray.reduce((n, { value }) => n + value, 0);
  // console.log(cardArray.length, rawVal);
  if (cardArray.length === 2 && rawVal === 11 && aceExists) {
    return 21;
  }
  if (aceExists === true && rawVal + 10 < 22) {
    console.log(`${rawVal + 10}/${rawVal}`);
    return `${rawVal + 10}/${rawVal}`;
  } else {
    // console.log(rawVal);
    return rawVal;
  }
}

export function sumMitCount(cardArray) {
  return cardArray.reduce((n, { mitCountValue }) => n + mitCountValue, 0);
}

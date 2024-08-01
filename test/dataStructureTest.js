let playerModel = [
  { active: true, bank: 1300, isHuman: false },
  { active: true, bank: 1300, isHuman: false },
  { active: true, bank: 1300, isHuman: false },
  { active: true, bank: 1300, isHuman: true },
  { active: true, bank: 1300, isHuman: true },
  { active: true, bank: 1300, isHuman: false },
];

let dealerHand = { cards: { value: 18 }, isDone: true, isBlackjack: false };

let playersHands = [
  {
    id: 0,
    hands: [
      {
        cards: [
          { name: '02-05-1', value: 5, mitCountValue: 1, cardSvg: './SVGs/02-05.svg', deckNum: '1' },
          { name: '01-13K-5', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-13K.svg', deckNum: '5' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 10,
      },
    ],
  },

  {
    id: 1,
    hands: [
      {
        cards: [
          { name: '01-12Q-4', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-12Q.svg', deckNum: '4' },
          { name: '01-01-4', value: 1, mitCountValue: -1, cardSvg: './SVGs/01-01.svg', deckNum: '4' },
        ],
        isDone: true,
        isBlackjack: true,
        betAmount: 10,
      },
      {
        cards: [
          { name: '01-11J-1', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-11J.svg', deckNum: '1' },
          { name: '04-09-1', value: 9, mitCountValue: 0, cardSvg: './SVGs/04-09.svg', deckNum: '1' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 10,
      },
    ],
  },

  {
    id: 2,
    hands: [
      {
        cards: [
          { name: '04-11J-4', value: 10, mitCountValue: -1, cardSvg: './SVGs/04-11J.svg', deckNum: '4' },
          { name: '04-04-5', value: 4, mitCountValue: 1, cardSvg: './SVGs/04-04.svg', deckNum: '5' },
          { name: '01-08-3', value: 8, mitCountValue: 0, cardSvg: './SVGs/01-08.svg', deckNum: '3' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 10,
      },
      {
        cards: [
          { name: '02-13K-4', value: 10, mitCountValue: -1, cardSvg: './SVGs/02-13K.svg', deckNum: '4' },
          { name: '01-01-3', value: 1, mitCountValue: -1, cardSvg: './SVGs/01-01.svg', deckNum: '3' },
          { name: '02-07-4', value: 7, mitCountValue: 0, cardSvg: './SVGs/02-07.svg', deckNum: '4' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 100,
      },
    ],
  },

  {
    id: 3,
    hands: [
      {
        cards: [
          { name: '03-03-5', value: 3, mitCountValue: 1, cardSvg: './SVGs/03-03.svg', deckNum: '5' },
          { name: '04-01-2', value: 1, mitCountValue: -1, cardSvg: './SVGs/04-01.svg', deckNum: '2' },
          { name: '02-13K-6', value: 10, mitCountValue: -1, cardSvg: './SVGs/02-13K.svg', deckNum: '6' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 25,
      },
    ],
  },

  {
    id: 4,
    hands: [
      {
        cards: [
          { name: '03-07-5', value: 7, mitCountValue: 0, cardSvg: './SVGs/03-07.svg', deckNum: '5' },
          { name: '02-03-4', value: 3, mitCountValue: 1, cardSvg: './SVGs/02-03.svg', deckNum: '4' },
          { name: '02-04-6', value: 4, mitCountValue: 1, cardSvg: './SVGs/02-04.svg', deckNum: '6' },
          { name: '03-07-1', value: 7, mitCountValue: 0, cardSvg: './SVGs/03-07.svg', deckNum: '1' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 10,
      },
      {
        cards: [
          { name: '02-01-3', value: 1, mitCountValue: -1, cardSvg: './SVGs/02-01.svg', deckNum: '3' },
          { name: '01-09-6', value: 9, mitCountValue: 0, cardSvg: './SVGs/01-09.svg', deckNum: '6' },
        ],
        isDone: true,
        isBlackjack: false,
        betAmount: 10,
      },
      {
        cards: [
          { name: '02-01-2', value: 1, mitCountValue: -1, cardSvg: './SVGs/02-01.svg', deckNum: '2' },
          { name: '01-12Q-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-12Q.svg', deckNum: '3' },
        ],
        isDone: true,
        isBlackjack: true,
        betAmount: 10,
      },
    ],
  },

  {
    id: 5,
    hands: [
      {
        cards: [
          { name: '03-10-5', value: 10, mitCountValue: -1, cardSvg: './SVGs/03-10.svg', deckNum: '5' },
          { name: '03-13K-6', value: 10, mitCountValue: -1, cardSvg: './SVGs/03-13K.svg', deckNum: '6' },
        ],
        isDone: false,
        isBlackjack: false,
        betAmount: 10,
      },
    ],
  },
];

function checkPlayerOutcome(dealerHand, playersHands) {
  console.log('Dealer:');
  console.log('Cards:', dealerHand.cards);
  console.log('Is Done:', dealerHand.isDone);
  console.log('Is Blackjack:', dealerHand.isBlackjack);
  console.log('------------');

  console.log('Players:');
  console.log('------------');
  playersHands.forEach(player => {
    console.log(`Player ${player.id}:`);
    player.hands.forEach((hand, index) => {
      console.log(`Hand ${index}:`);
      hand.cards.forEach(card => {
        console.log(`Card Value: ${card.value}`);
      });
      console.log(`Is Done: ${hand.isDone}`);
      console.log(`Is Blackjack: ${hand.isBlackjack}`);
      console.log(`Bet Amount: ${hand.betAmount}`);
      console.log('------------');
    });
  });
}

checkPlayerOutcome(dealerHand, playersHands);

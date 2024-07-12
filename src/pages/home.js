import { useState, useEffect } from 'react';
import cardDeckAssembly from '../components/cardAssembly';
import shuffleDeck from '../components/shuffleDeck';
import TopBar from '../components/topBar';
import BottomBar from '../components/bottomBar';
import PlayArea from '../components/playArea';

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  const [playingDeck, setPlayingDeck] = useState([]);

  const [deckIndex, setDeckIndex] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [pile, setPile] = useState([]);

  const [dealButton, disableDealButton] = useState(false);
  const [splitButton, disableSplitButton] = useState(true);
  const [doubleButton, disableDoubleButton] = useState(true);
  const [hitButton, disableHitButton] = useState(true);
  const [standButton, disableStandButton] = useState(true);
  const [surrenderButton, disableSurrenderButton] = useState(true);

  useEffect(() => {
    let cardDeck = cardDeckAssembly(deckAmount);
    let shuffledDeck = shuffleDeck(cardDeck);
    setPlayingDeck(shuffledDeck);
  }, [deckAmount]);

  // Game Logic Functions
  function deal() {
    disableDealButton(true);
    let updatedDealerCards = [];
    let updatedPlayerCards = [];
    let cardsToPile = [...pile];

    for (let i = 0; i < 4; i = i + 2) {
      updatedDealerCards.push(playingDeck[deckIndex + i]);
      cardsToPile.push(playingDeck[deckIndex + i]);
      updatedPlayerCards.push(playingDeck[deckIndex + i + 1]);
      cardsToPile.push(playingDeck[deckIndex + i + 1]);
    }

    setDealerCards(updatedDealerCards);
    setPlayerCards(updatedPlayerCards);
    setPile(cardsToPile);
    setDeckIndex(deckIndex + 4);

    disableDoubleButton(false);
    disableHitButton(false);
    disableStandButton(false);

    if (
      updatedPlayerCards.length >= 2 &&
      updatedPlayerCards[0].value === updatedPlayerCards[1].value
    ) {
      console.log(
        `same values ${updatedPlayerCards[0].value} // ${updatedPlayerCards[1].value}`,
      );
      disableSplitButton(false);
    }
  }

  function dealCard(target) {
    let cardsDealt = [...target, playingDeck[deckIndex]];

    // temporarily set to player
    setPlayerCards(cardsDealt);
    // temporarily set to player

    setPile([...pile, playingDeck[deckIndex]]);
    setDeckIndex(prevIndex => prevIndex + 1);
    return cardsDealt;
  }

  function sumValues(cardArray) {
    return cardArray.reduce((n, { value }) => n + value, 0);
  }

  function split() {
    console.log('split');
  }

  function double() {
    dealCard(playerCards);
    checkBust(dealCard(playerCards));
    stand();
  }

  function hit() {
    disableDoubleButton(true);
    disableSplitButton(true);

    dealCard(playerCards);
    checkBust(dealCard(playerCards));
  }

  function stand() {
    checkOutcome();
  }

  function surrender() {
    console.log('surrender');
  }

  function resetButtons() {
    disableDoubleButton(true);
    disableHitButton(true);
    disableSplitButton(true);
    disableSurrenderButton(true);
    disableStandButton(true);
    disableDealButton(false);
  }

  function win() {
    resetButtons();
    console.log('win');
  }

  function lose() {
    resetButtons();
    console.log('lose');
  }

  function push() {
    resetButtons();
    console.log('push');
  }

  function checkBust(cardsDealt) {
    if (sumValues(cardsDealt) === 21) {
      stand();
    } else if (cardsDealt.reduce((n, { value }) => n + value, 0) > 21) {
      lose();
    }
  }

  function checkOutcome() {
    console.log(playerCards);
    console.log(dealerCards);
    if (sumValues(playerCards) === sumValues(dealerCards)) {
      push();
    } else if (sumValues(playerCards) < sumValues(dealerCards)) {
      lose();
    } else if (sumValues(playerCards) > sumValues(dealerCards)) {
      win();
    }
  }

  function printPile() {
    console.log(pile);
  }

  const actions = {
    deal: {
      func: deal,
      disabled: dealButton,
    },
    split: {
      func: split,
      disabled: splitButton,
    },
    double: {
      func: double,
      disabled: doubleButton,
    },
    hit: {
      func: hit,
      disabled: hitButton,
    },
    stand: {
      func: stand,
      disabled: standButton,
    },
    surrender: {
      func: surrender,
      disabled: surrenderButton,
    },
    printPile: {
      func: printPile,
      disabled: false,
    },
  };

  const mitCount = pile.reduce((n, { mitCountValue }) => n + mitCountValue, 0);

  return (
    <div className="top flex-column">
      <TopBar
        deckAmount={deckAmount}
        setDeckAmount={setDeckAmount}
        actions={actions}
      />
      <PlayArea dealerCards={dealerCards} playerCards={playerCards} />
      <BottomBar mitCount={mitCount} actions={actions} />
    </div>
  );
}

// let pile = [
//   { name: '04-13K-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/04-13K.svg', deckNum: '3' },
//   { name: '02-10-6', value: 10, mitCountValue: -1, cardSvg: './SVGs/02-10.svg', deckNum: '6' },
//   { name: '01-12Q-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-12Q.svg', deckNum: '3' },
//   { name: '01-01-6', value: 11, mitCountValue: -1, cardSvg: './SVGs/01-01.svg', deckNum: '6' },
// ];

// let dealerCards = [
//   { name: '04-13K-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/04-13K.svg', deckNum: '3' },
//   { name: '02-10-6', value: 10, mitCountValue: -1, cardSvg: './SVGs/02-10.svg', deckNum: '6' },
// ];

// let playerCards = [
//   { name: '01-12Q-3', value: 10, mitCountValue: -1, cardSvg: './SVGs/01-12Q.svg', deckNum: '3' },
//   { name: '01-01-6', value: 11, mitCountValue: -1, cardSvg: './SVGs/01-01.svg', deckNum: '6' },
// ];

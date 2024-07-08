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

  const [dealButton, setDealButton] = useState(true);
  const [splitButton, setSplitButton] = useState(true);
  const [doubleButton, setDoubleButton] = useState(true);
  const [hitButton, setHitButton] = useState(false);
  const [standButton, setStandButton] = useState(true);
  const [surrenderButton, setSurrenderButton] = useState(true);

  useEffect(() => {
    let cardDeck = cardDeckAssembly(deckAmount);
    let shuffledDeck = shuffleDeck(cardDeck);
    setPlayingDeck(shuffledDeck);
  }, [deckAmount]);

  // Game Logic Functions
  function deal() {
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

    setHitButton(false);

    if (updatedPlayerCards.length >= 2 && updatedPlayerCards[0].value === updatedPlayerCards[1].value) {
      console.log(`same values ${updatedPlayerCards[0].value} // ${updatedPlayerCards[1].value}`);
    }
  }

  function split() {
    console.log('split');
  }
  function double() {
    console.log('double');
  }
  function hit() {
    console.log(deckIndex, playingDeck[deckIndex]);
    setPlayerCards([...playerCards, playingDeck[deckIndex]]);
    setPile([...pile, playingDeck[deckIndex]]);
    setDeckIndex((prevIndex) => prevIndex + 1);
    console.log(playerCards.reduce((n, { value }) => n + value, 0));
  }
  function stand() {
    console.log('stand');
  }
  function surrender() {
    console.log('surrender');
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
  };

  const mitCount = pile.reduce((n, { mitCountValue }) => n + mitCountValue, 0);

  return (
    <div className="top flex-column">
      <TopBar deckAmount={deckAmount} setDeckAmount={setDeckAmount} />
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

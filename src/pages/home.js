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

  useEffect(() => {
    let cardDeck = cardDeckAssembly(deckAmount);
    let shuffledDeck = shuffleDeck(cardDeck);
    setPlayingDeck(shuffledDeck);
  }, [deckAmount]);

  function deal() {
    let updatedDealerCards = [...dealerCards];
    let updatedPlayerCards = [...playerCards];
    let cardsToPile = [...pile];

    for (let i = 0; i < 4; i = i + 2) {
      console.log('dealer', i, deckIndex, playingDeck[deckIndex + i]);
      updatedDealerCards.push(playingDeck[deckIndex + i]);
      cardsToPile.push(playingDeck[deckIndex + i]);
      console.log('player', i + 1, deckIndex, playingDeck[deckIndex + i + 1]);
      updatedPlayerCards.push(playingDeck[deckIndex + i + 1]);
      cardsToPile.push(playingDeck[deckIndex + i + 1]);
    }

    setDealerCards(updatedDealerCards);
    setPlayerCards(updatedPlayerCards);
    setPile(cardsToPile);
    setDeckIndex(deckIndex + 4);
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
  }
  function stand() {
    console.log('stand');
  }
  function surrender() {
    console.log('surrender');
  }

  const actions = {
    deal,
    split,
    double,
    hit,
    stand,
    surrender,
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

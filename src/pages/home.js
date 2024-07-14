import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/topBar';
import BottomBar from '../components/bottomBar';
import PlayArea from '../components/playArea';

import { printArray } from '../components/gameLogic/otherActions';
import {
  cardDeckAssembly,
  shuffleDeck,
  sumValues,
  sumMitCount,
  sumWithAce,
} from '../components/gameLogic/calculations';

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

  const [hiddenCard, setHiddenCard] = useState(true);
  const [gameInProgress, setGameInProgress] = useState(false);

  const hasInitialized = useRef(false);
  const mitCount = sumMitCount(pile);

  useEffect(() => {
    if (!hasInitialized.current) {
      function initializeDeck() {
        let cardDeck = cardDeckAssembly(deckAmount);
        let shuffledDeck = shuffleDeck(cardDeck);
        setPlayingDeck(shuffledDeck);
      }

      initializeDeck();
      hasInitialized.current = true;
    }
  }, [deckAmount]);

  // Game Logic Functions
  function deal() {
    setGameInProgress(true);
    setHiddenCard(true);
    disableDealButton(true);
    let updatedDealerCards = [];
    let updatedPlayerCards = [];
    let cardsToPile = [...pile];

    for (let i = 0; i < 4; i = i + 2) {
      updatedPlayerCards.push(playingDeck[deckIndex + i]);
      cardsToPile.push(playingDeck[deckIndex + i]);
      updatedDealerCards.push(playingDeck[deckIndex + i + 1]);
      cardsToPile.push(playingDeck[deckIndex + i + 1]);
    }

    setPlayerCards(updatedPlayerCards);
    setDealerCards(updatedDealerCards);
    setPile(cardsToPile);
    setDeckIndex(deckIndex + 4);

    disableDoubleButton(false);
    disableHitButton(false);
    disableStandButton(false);

    if (updatedPlayerCards.length >= 2 && updatedPlayerCards[0].value === updatedPlayerCards[1].value) {
      console.log(`same values ${updatedPlayerCards[0].value} // ${updatedPlayerCards[1].value}`);
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
    disableAllButtons();
    setTimeout(() => {
      setHiddenCard(false);
    }, 500);
    setTimeout(() => {
      dealerPlay();
    }, 1500);
  }

  function surrender() {
    console.log('surrender');
  }

  function disableAllButtons() {
    disableDoubleButton(true);
    disableHitButton(true);
    disableSplitButton(true);
    disableSurrenderButton(true);
    disableStandButton(true);
    disableDealButton(true);
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
    setGameInProgress(false);
    resetButtons();
    console.log('win');
  }

  function lose() {
    setGameInProgress(false);
    resetButtons();
    console.log('lose');
  }

  function push() {
    setGameInProgress(false);
    resetButtons();
    console.log('push');
  }

  function checkBust(cardsDealt) {
    if (sumValues(cardsDealt) === 21) {
      stand();
    } else if (sumValues(cardsDealt) > 21) {
      setTimeout(() => {
        setHiddenCard(false);
      }, 500);
      setTimeout(() => {
        lose();
      }, 1000);
    }
  }

  function checkOutcome(dealerBust) {
    console.log(`checking outcome`);

    if (dealerBust === true) {
      console.log(`result: player: ${sumValues(playerCards)} // ${sumValues(dealerCards)}`);
      win();
    } else if (sumValues(playerCards) === sumValues(dealerCards)) {
      console.log(`result: player: ${sumValues(playerCards)} // ${sumValues(dealerCards)}`);
      push();
    } else if (sumValues(playerCards) < sumValues(dealerCards)) {
      console.log(`result: player: ${sumValues(playerCards)} // ${sumValues(dealerCards)}`);
      lose();
    } else if (sumValues(playerCards) > sumValues(dealerCards)) {
      console.log(`result: player: ${sumValues(playerCards)} // ${sumValues(dealerCards)}`);
      win();
    }
  }

  function dealerPlay() {
    let updatedDealerCards = dealerCards;
    let newCardIndex = deckIndex;
    let dealerBust = false;
    function drawCard() {
      if (sumValues(updatedDealerCards) < 17) {
        console.log(sumValues(updatedDealerCards));
        updatedDealerCards.push(playingDeck[newCardIndex]);
        setDealerCards([...updatedDealerCards]);
        setPile(prevPile => [...prevPile, playingDeck[newCardIndex]]);
        newCardIndex = newCardIndex + 1;
        setDeckIndex(prevIndex => prevIndex + 1);

        setTimeout(drawCard, 1000);
      } else {
        if (sumValues(updatedDealerCards) > 21) {
          dealerBust = true;
        }
        checkOutcome(dealerBust);
      }
    }
    drawCard();
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
    printArray: {
      func: () => printArray(pile),
      disabled: false,
    },
    resetDeck: {
      func: () => {
        setPlayingDeck([]);
        setDealerCards([]);
        setPlayerCards([]);
        setPile([]);
        setDeckIndex(0);
        resetButtons();

        let cardDeck = cardDeckAssembly(deckAmount);
        let shuffledDeck = shuffleDeck(cardDeck);
        setPlayingDeck(shuffledDeck);
      },
      disabled: false,
    },
  };

  const devActions = {
    flipHidden: () => {
      if (hiddenCard) {
        setHiddenCard(false);
      } else {
        setHiddenCard(true);
      }
    },
    addToDealer: () => {
      setDealerCards([...dealerCards, playingDeck[deckIndex]]);
    },
    printDealer: () => console.log(dealerCards),
    printPlayer: () => console.log(playerCards),
    printDeck: () => console.log(playingDeck),
    printDeckCount: () => console.log(playingDeck.length),
    printPile: () => console.log(pile),
    printPileCount: () => console.log(pile.length),
    printAce: () => sumWithAce(playerCards),
  };

  return (
    <div className="top flex-column">
      <TopBar mitCount={mitCount} actions={actions} />
      <PlayArea
        dealerCards={dealerCards}
        playerCards={playerCards}
        hiddenCard={hiddenCard}
        devActions={devActions}
        gameInProgress={gameInProgress}
      />
      <BottomBar
        deckAmount={deckAmount}
        setDeckAmount={setDeckAmount}
        mitCount={mitCount}
        actions={actions}
        gameInProgress={gameInProgress}
      />
    </div>
  );
}

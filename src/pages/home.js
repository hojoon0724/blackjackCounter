import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/topBar';
import BottomBar from '../components/bottomBar';
import PlayArea from '../components/playArea';

import { printArray } from '../components/gameLogic/otherActions';
import {
  cardDeckAssembly,
  shuffleDeck,
  sumFinalValues,
  sumMitCount,
  sumWithAce,
} from '../components/gameLogic/calculations';

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  const [playingDeck, setPlayingDeck] = useState([]);

  const [deckIndex, setDeckIndex] = useState(0);
  const [cutIndex, setCutIndex] = useState(6);
  const [needsShuffle, setNeedsShuffle] = useState(false);
  const [isShuffled, setIsShuffled] = useState(true);

  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([[]]);

  const [nextUp, setNextUp] = useState(0);
  const [dealButton, disableDealButton] = useState(false);
  const [splitButton, disableSplitButton] = useState(true);
  const [doubleButton, disableDoubleButton] = useState(true);
  const [hitButton, disableHitButton] = useState(true);
  const [standButton, disableStandButton] = useState(true);
  const [surrenderButton, disableSurrenderButton] = useState(true);

  const [pile, setPile] = useState([]);
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

  // useEffect(() => {
  //   if (needsShuffle && !isShuffled) {
  //     shuffleDecks();
  //   }
  // }, [needsShuffle, isShuffled]);

  // Game Logic Functions

  function shuffleDecks() {
    setPlayingDeck([]);
    setDealerCards([]);
    setPlayerCards([[]]);
    setPile([]);
    setDeckIndex(0);
    resetButtons();

    let cardDeck = cardDeckAssembly(deckAmount);
    let shuffledDeck = shuffleDeck(cardDeck);
    setPlayingDeck(shuffledDeck);
    // setCutIndex(shuffleDeck.length - 30);
    setIsShuffled(true);
    setNeedsShuffle(false);
  }

  function deal() {
    if (needsShuffle === true) {
      setIsShuffled(false);
    }

    setGameInProgress(true);
    setHiddenCard(true);
    disableDealButton(true);
    let updatedDealerCards = [];
    let updatedPlayerCards = [[]];
    let cardsToPile = [...pile];

    for (let i = 0; i < 4; i = i + 2) {
      updatedPlayerCards[0].push(playingDeck[deckIndex + i]);
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
    disableSurrenderButton(false);

    // if (updatedPlayerCards.length >= 2 && updatedPlayerCards[0].value === updatedPlayerCards[1].value) {
    //   console.log(`same values ${updatedPlayerCards[0].value} // ${updatedPlayerCards[1].value}`);
    //   disableSplitButton(false);
    // }
    disableSplitButton(false);
  }

  // function makeDealingOrder() {
  //   return [setPlayerCards(), setDealerCards()];
  // }

  function dealCard(targetArray) {
    setPile([...pile, playingDeck[deckIndex]]);

    let updatedHand = [...targetArray, playingDeck[deckIndex]];
    setDeckIndex(prevIndex => prevIndex + 1);
    return updatedHand;
  }

  function split() {
    disableSurrenderButton(true);

    if (playerCards[0][0].value === 1 && playerCards[0][1].value === 1) {
      console.log('split aces');
    }

    let updatedPlayerCards = [];
    updatedPlayerCards.push([playerCards[0][0]]);
    updatedPlayerCards.push([playerCards[0][1]]);
    console.log(updatedPlayerCards);
    setPlayerCards(updatedPlayerCards);
  }

  function double() {
    disableSurrenderButton(true);
    dealCard(playerCards[0]);
    checkBust(dealCard(playerCards[0]));
    stand();
  }

  function hit() {
    let handIndex = 0;
    disableSurrenderButton(true);
    disableDoubleButton(true);
    disableSplitButton(true);

    let currentHand = dealCard(playerCards[0]);

    let updatedPlayerCards = [];
    updatedPlayerCards.push(dealCard(playerCards[0]));
    console.log(updatedPlayerCards);

    setPlayerCards(updatedPlayerCards);
    checkBust(currentHand);
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
    console.log('win');
    setGameInProgress(false);
    resetButtons();
  }

  function lose() {
    console.log('lose');
    setGameInProgress(false);
    resetButtons();
  }

  function push() {
    console.log('push');
    setGameInProgress(false);
    resetButtons();
  }

  function checkBust(cardsDealt) {
    console.log('-----checkBust-----');
    console.log(cardsDealt);
    console.log(sumFinalValues(cardsDealt));
    if (sumFinalValues(cardsDealt) === 21) {
      stand();
    } else if (sumFinalValues(cardsDealt) > 21) {
      setTimeout(() => {
        setHiddenCard(false);
      }, 500);
      setTimeout(() => {
        lose();
      }, 1000);
    }
  }

  function checkOutcome(dealerBust) {
    checkNeedsShuffle(cutIndex, deckIndex);

    if (dealerBust === true) {
      console.log(`result: player: ${sumFinalValues(playerCards[0])} // ${sumFinalValues(dealerCards)}`);
      win();
    } else if (sumFinalValues(playerCards[0]) === sumFinalValues(dealerCards)) {
      console.log(`result: player: ${sumFinalValues(playerCards[0])} // ${sumFinalValues(dealerCards)}`);
      push();
    } else if (sumFinalValues(playerCards[0]) < sumFinalValues(dealerCards)) {
      console.log(`result: player: ${sumFinalValues(playerCards[0])} // ${sumFinalValues(dealerCards)}`);
      lose();
    } else if (sumFinalValues(playerCards[0]) > sumFinalValues(dealerCards)) {
      console.log(`result: player: ${sumFinalValues(playerCards[0])} // ${sumFinalValues(dealerCards)}`);
      win();
    }
  }

  function dealerPlay() {
    let updatedDealerCards = dealerCards;
    let newCardIndex = deckIndex;
    let dealerBust = false;
    function drawCard() {
      if (sumFinalValues(updatedDealerCards) < 17) {
        updatedDealerCards.push(playingDeck[newCardIndex]);
        setDealerCards([...updatedDealerCards]);
        setPile(prevPile => [...prevPile, playingDeck[newCardIndex]]);
        newCardIndex = newCardIndex + 1;
        setDeckIndex(prevIndex => prevIndex + 1);

        setTimeout(drawCard, 1000);
      } else {
        if (sumFinalValues(updatedDealerCards) > 21) {
          dealerBust = true;
        }
        checkOutcome(dealerBust);
      }
    }
    drawCard();
  }

  function checkNeedsShuffle(cutIndex, currentIndex) {
    if (cutIndex < currentIndex) {
      setNeedsShuffle(true);
    }
  }

  const actions = {
    deal: {
      func: () => deal(),
      disabled: dealButton,
    },
    split: {
      func: () => split(),
      disabled: splitButton,
    },
    double: {
      func: () => double(),
      disabled: doubleButton,
    },
    hit: {
      func: () => hit(),
      disabled: hitButton,
    },
    stand: {
      func: () => stand(),
      disabled: standButton,
    },
    surrender: {
      func: () => surrender(),
      disabled: surrenderButton,
    },
    printArray: {
      func: () => printArray(pile),
      disabled: false,
    },
    resetDeck: {
      func: () => shuffleDecks(),
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
    printStates: () => {
      console.log(`needsShuffle = ${needsShuffle}`);
      console.log(`isShuffled = ${isShuffled}`);
      console.log(`gameInProgress = ${gameInProgress}`);
      console.log(`hiddenCard = ${hiddenCard}`);
    },
    printAce: () => console.log(sumWithAce(playerCards[0])),
    // dealNext: () => dealCard(),
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

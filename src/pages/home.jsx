import { useState, useEffect, useRef, createContext } from 'react';
import TopBar from '../components/ui/topBar';
import BottomBar from '../components/ui/bottomBar';
import PlayArea from '../components/playArea/playArea';

import { cardDeckAssembly, shuffleDeck, sumFinalValues, sumMitCount, sumWithAce } from '../gameLogic/calculations';

export const GameContext = createContext();

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  const [playingDeck, setPlayingDeck] = useState([]);

  const [deckIndex, setDeckIndex] = useState(0);
  const [cutIndex, setCutIndex] = useState(6);
  const [needsShuffle, setNeedsShuffle] = useState(false);
  const [isShuffled, setIsShuffled] = useState(true);

  const [gameInProgress, setGameInProgress] = useState(false);
  const [dealerCards, setDealerCards] = useState([]);
  const [hiddenCard, setHiddenCard] = useState(true);
  const [playerCards, setPlayerCards] = useState([[]]);
  const [currentHandIndex, setCurrentHandIndex] = useState(0);

  const [dealButton, disableDealButton] = useState(false);
  const [splitButton, disableSplitButton] = useState(true);
  const [doubleButton, disableDoubleButton] = useState(true);
  const [hitButton, disableHitButton] = useState(true);
  const [standButton, disableStandButton] = useState(true);
  const [surrenderButton, disableSurrenderButton] = useState(true);

  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  const [pile, setPile] = useState([]);

  const hasInitialized = useRef(false);
  const mitCount = sumMitCount(pile);

  const [gameCount, setGameCount] = useState(0);

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
    setGameInProgress(false);
  }

  function deal() {
    if (needsShuffle === true) {
      setIsShuffled(false);
    }

    setCurrentHandIndex(0);
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

    if (sumFinalValues(updatedPlayerCards[0]) === 21) {
      stand();
    }

    // if (updatedPlayerCards.length >= 2 && updatedPlayerCards[0].value === updatedPlayerCards[1].value) {
    //   console.log(`same values ${updatedPlayerCards[0].value} // ${updatedPlayerCards[1].value}`);
    //   disableSplitButton(false);
    // }
    disableSplitButton(false);
  }

  function dealCard(targetArray) {
    setPile([...pile, playingDeck[deckIndex]]);

    let updatedHand = [...targetArray, playingDeck[deckIndex]];
    setDeckIndex(prevIndex => prevIndex + 1);
    return updatedHand;
  }

  function split(currentHandIndex) {
    // disableSurrenderButton(true);
    if (playerCards[0][0].value === 1 && playerCards[0][1].value === 1) {
      console.log('split aces');
    }

    let updatedPlayerCards = playerCards;
    let newHandArray = [updatedPlayerCards[currentHandIndex][1]];
    updatedPlayerCards[currentHandIndex].pop();
    updatedPlayerCards.push(newHandArray);

    updatedPlayerCards[currentHandIndex] = dealCard(updatedPlayerCards[currentHandIndex]);
    setPlayerCards(updatedPlayerCards);
  }

  function double(currentHandIndex) {
    disableSurrenderButton(true);
    let currentHand = dealCard(playerCards[currentHandIndex]);

    let updatedPlayerCards = playerCards;
    updatedPlayerCards[currentHandIndex] = dealCard(playerCards[currentHandIndex]);

    setPlayerCards(updatedPlayerCards);
    checkBust(currentHand);
    stand(currentHandIndex);
  }

  function hit(currentHandIndex) {
    disableSurrenderButton(true);
    disableDoubleButton(true);
    // disableSplitButton(true);

    let currentHand = dealCard(playerCards[currentHandIndex]);

    let updatedPlayerCards = playerCards;
    updatedPlayerCards[currentHandIndex] = dealCard(playerCards[currentHandIndex]);

    if (sumFinalValues(updatedPlayerCards[currentHandIndex]) === 21) {
      stand(currentHandIndex);
    }

    setPlayerCards(updatedPlayerCards);
    checkBust(currentHand);
  }

  function stand(currentHandIndex) {
    if (playerCards.length - 1 > currentHandIndex) {
      setCurrentHandIndex(currentHandIndex + 1);
      hit(currentHandIndex + 1);
    } else {
      console.log('starting stand-else portion');
      disableAllButtons();
      setTimeout(() => {
        setHiddenCard(false);
      }, 500);
      setTimeout(() => {
        dealerPlay();
      }, 1500);
    }
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

  function win(handIndex) {
    console.log(handIndex, 'win');
  }

  function lose(handIndex) {
    console.log(handIndex, 'lose');
  }

  function push(handIndex) {
    console.log(handIndex, 'push');
  }

  function checkBust(cardsDealt) {
    if (sumFinalValues(cardsDealt) >= 21) {
      stand(currentHandIndex);
    }
  }

  function checkOutcome(dealerBust) {
    checkNeedsShuffle(cutIndex, deckIndex);

    for (let handIndex in playerCards) {
      console.log(handIndex, sumFinalValues(playerCards[handIndex]));
      let playerSumVal = sumFinalValues(playerCards[handIndex]);
      let dealerSumVal = sumFinalValues(dealerCards);
      if (playerSumVal > 21) {
        lose(handIndex);
      } else if (dealerBust) {
        win(handIndex);
      } else {
        if (playerSumVal > dealerSumVal) {
          win(handIndex);
        } else if (playerSumVal === dealerSumVal) {
          push(handIndex);
        } else if (playerSumVal < dealerSumVal) {
          lose(handIndex);
        }
      }
    }

    setGameInProgress(false);
    resetButtons();
    console.log(gameCount);
    setGameCount(gameCount + 1);
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
      func: currentHandIndex => () => split(currentHandIndex),
      disabled: splitButton,
    },
    double: {
      func: currentHandIndex => () => double(currentHandIndex),
      disabled: doubleButton,
    },
    hit: {
      func: currentHandIndex => () => hit(currentHandIndex),
      disabled: hitButton,
    },
    stand: {
      func: currentHandIndex => () => stand(currentHandIndex),
      disabled: standButton,
    },
    surrender: {
      func: currentHandIndex => () => surrender(currentHandIndex),
      disabled: surrenderButton,
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
      console.log(`currentHandIndex = ${currentHandIndex}`);
      console.log(`settingsModalIsOpen = ${settingsModalIsOpen}`);
    },
    printAce: () => console.log(sumWithAce(playerCards[0])),
    // dealNext: () => dealCard(),
  };

  return (
    <GameContext.Provider
      value={{
        deckAmount,
        setDeckAmount,

        playingDeck,
        setPlayingDeck,
        deckIndex,
        setDeckIndex,
        cutIndex,
        setCutIndex,
        needsShuffle,
        setNeedsShuffle,
        isShuffled,
        setIsShuffled,

        gameInProgress,
        setGameInProgress,
        dealerCards,
        setDealerCards,
        hiddenCard,
        setHiddenCard,
        playerCards,
        setPlayerCards,
        currentHandIndex,
        setCurrentHandIndex,

        dealButton,
        disableDealButton,
        splitButton,
        disableSplitButton,
        doubleButton,
        disableDoubleButton,
        hitButton,
        disableHitButton,
        standButton,
        disableStandButton,
        surrenderButton,
        disableSurrenderButton,

        settingsModalIsOpen,
        setSettingsModalIsOpen,

        pile,
        setPile,
        hasInitialized,
        mitCount,

        actions,
        devActions,
      }}
    >
      <div className="top flex-column">
        <TopBar />
        <PlayArea />
        <BottomBar />
      </div>
    </GameContext.Provider>
  );
}

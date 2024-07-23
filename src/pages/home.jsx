import { useState, useEffect, useRef, createContext } from 'react';
import TopBar from '../components/ui/topBar';
import BottomBar from '../components/ui/bottomBar';
import PlayArea from '../components/playArea/playArea';

import { cardDeckAssembly, shuffleDeck, sumFinalValues, sumMitCount, sumWithAce } from '../gameLogic/calculations';
import PlayerStats from '../components/ui/playerStats';

export const GameContext = createContext();

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  const [playingDeck, setPlayingDeck] = useState([]);

  const [deckIndex, setDeckIndex] = useState(0);
  const [cutIndex, setCutIndex] = useState(deckAmount * 48);
  const [needsShuffle, setNeedsShuffle] = useState(false);
  const [isShuffled, setIsShuffled] = useState(true);

  const [gameInProgress, setGameInProgress] = useState(false);
  const [dealerCards, setDealerCards] = useState([]);
  const [hiddenCard, setHiddenCard] = useState(true);
  const [playerCards, setPlayerCards] = useState([[]]);
  const [currentHandIndex, setCurrentHandIndex] = useState(0);

  const [splitButton, disableSplitButton] = useState(true);
  const [doubleButton, disableDoubleButton] = useState(true);
  const [hitButton, disableHitButton] = useState(true);
  const [standButton, disableStandButton] = useState(true);
  const [surrenderButton, disableSurrenderButton] = useState(true);

  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  const [pile, setPile] = useState([]);

  const [gameCount, setGameCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [pushCount, setPushCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  const [bank, setBank] = useState(10000);
  const [betAmount, setBetAmount] = useState(10);
  const [betAmountArray, setBetAmountArray] = useState([betAmount]);

  const hasInitialized = useRef(false);
  const mitCount = sumMitCount(pile);
  let winnings = 0;

  let cardIndexModifier = -1;
  let dealerCardsTestArray = [];
  let playerCardsTestArray = [];
  let betAmountTestArray = [];

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

  function shuffleDecks() {
    let cardDeck = cardDeckAssembly(deckAmount);
    let shuffledDeck = shuffleDeck(cardDeck);
    setPlayingDeck(shuffledDeck);
    setIsShuffled(true);
    setNeedsShuffle(false);
    setGameInProgress(false);
  }

  // -----------------------------------------------------
  // - Play Logic
  // -----------------------------------------------------

  function deal() {
    if (needsShuffle === true) {
      setIsShuffled(false);
    }

    setCurrentHandIndex(0);
    setBetAmountArray([betAmount]);
    setGameInProgress(true);
    setHiddenCard(true);
    let dealersHand = [];
    let playersHand = [[]];
    let cardsToPile = [...pile];

    for (let i = 0; i < 4; i = i + 2) {
      playersHand[0].push(playingDeck[deckIndex + i]);
      cardsToPile.push(playingDeck[deckIndex + i]);
      dealersHand.push(playingDeck[deckIndex + i + 1]);
      cardsToPile.push(playingDeck[deckIndex + i + 1]);
    }

    setPlayerCards(playersHand);
    setDealerCards(dealersHand);
    setPile(cardsToPile);
    setDeckIndex(deckIndex + 4);

    disableDoubleButton(false);
    disableHitButton(false);
    disableStandButton(false);
    disableSurrenderButton(false);
    playerCardsTestArray = [playersHand];
    dealerCardsTestArray = dealersHand;

    if (sumFinalValues(playersHand[0]) === 21) {
      betAmountTestArray[0] = betAmount * 1.5;
      stand(currentHandIndex);
    }

    if (playersHand.length === 2 && playersHand[0].value === playersHand[1].value) {
      console.log(`same values ${playersHand[0].value} // ${playersHand[1].value}`);
      disableSplitButton(false);
    }
    // disableSplitButton(false);
  }

  function split(currentHandIndex) {
    disableSurrenderButton(true);
    if (playerCards[0][0].value === 1 && playerCards[0][1].value === 1) {
      console.log('split aces');
    }

    let updatedPlayerCards = [...playerCards];
    let newHandArray = [updatedPlayerCards[currentHandIndex][1]];
    updatedPlayerCards[currentHandIndex].pop();
    updatedPlayerCards = [...updatedPlayerCards, newHandArray];
    let updatedBetAmountArray = [...betAmountArray, betAmount];
    setBetAmountArray(updatedBetAmountArray);

    updatedPlayerCards[currentHandIndex] = dealCard(updatedPlayerCards[currentHandIndex]);
    if (sumFinalValues(newHandArray) === 21) {
      stand(currentHandIndex);
    }
    setPlayerCards(updatedPlayerCards);
  }

  function double(currentHandIndex) {
    let updatedBetAmountArray = [...betAmountArray];
    updatedBetAmountArray[currentHandIndex] = updatedBetAmountArray[currentHandIndex] * 2;
    betAmountTestArray = updatedBetAmountArray;
    setBetAmountArray(updatedBetAmountArray);

    let updatedPlayerCards = [...playerCards];
    updatedPlayerCards[currentHandIndex] = dealCard(playerCards[currentHandIndex]);
    playerCardsTestArray = updatedPlayerCards;
    setPlayerCards(updatedPlayerCards);
    stand(currentHandIndex);
  }

  function hit(currentHandIndex) {
    disableSurrenderButton(true);
    disableSplitButton(true);

    let updatedPlayerCards = [];
    if (playerCardsTestArray.length === 0) {
      updatedPlayerCards = [...playerCards];
    } else {
      updatedPlayerCards = [...playerCardsTestArray];
    }
    updatedPlayerCards[currentHandIndex] = dealCard(playerCards[currentHandIndex]);
    if (updatedPlayerCards.length >= 2) {
      disableDoubleButton(false);
    } else {
      disableDoubleButton(true);
    }
    playerCardsTestArray = updatedPlayerCards;
    setPlayerCards(updatedPlayerCards);

    if (sumFinalValues(updatedPlayerCards[currentHandIndex]) === 21) {
      stand(currentHandIndex);
    }
    if (sumFinalValues(updatedPlayerCards[currentHandIndex]) > 21) {
      if (updatedPlayerCards.length <= 1) {
        setTimeout(() => {
          checkOutcome(false, dealerCards);
        }, 750);
      } else {
        stand(currentHandIndex);
      }
    }
  }

  function stand(currentHandIndex) {
    if (playerCards.length - 1 > currentHandIndex) {
      setCurrentHandIndex(currentHandIndex + 1);
      hit(currentHandIndex + 1);
      disableDoubleButton(false);
    } else {
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

  // -----------------------------------------------------
  // - Processing Logic
  // -----------------------------------------------------

  function resetTable() {
    setPlayingDeck([]);
    setDealerCards([]);
    setPlayerCards([[]]);
    setPile([]);
    setDeckIndex(0);
    resetButtons();
  }

  function nextCardsIndex() {
    cardIndexModifier++;
    setDeckIndex(prevNum => prevNum + 1);
    return deckIndex + cardIndexModifier;
  }

  function updateCardsTestArray() {
    if (playerCardsTestArray.length === 0) {
      playerCardsTestArray = playerCards;
    }
    if (dealerCardsTestArray.length === 0) {
      dealerCardsTestArray = dealerCards;
    }
  }

  function updatePlayerBetAmountArray() {
    if (betAmountTestArray.length === 0) {
      betAmountTestArray = betAmountArray;
    }
  }

  function dealCard(targetArray) {
    const newCard = playingDeck[nextCardsIndex()];
    setPile([...pile, newCard]);
    let handWithNewCard = [...targetArray, newCard];
    return handWithNewCard;
  }

  function dealerPlay() {
    let updatedDealerCards = [...dealerCards];
    let newDrawCardIndex = deckIndex;
    let dealerBust = false;
    function drawCard() {
      if (sumFinalValues(updatedDealerCards) < 17) {
        updatedDealerCards = [...updatedDealerCards, playingDeck[newDrawCardIndex]];
        dealerCardsTestArray = [...updatedDealerCards];
        setDealerCards([...updatedDealerCards]);
        setPile(prevPile => [...prevPile, playingDeck[newDrawCardIndex]]);
        newDrawCardIndex++;
        setDeckIndex(newDrawCardIndex);
        setTimeout(drawCard, 1000);
      } else {
        if (sumFinalValues(updatedDealerCards) > 21) {
          dealerBust = true;
        }
        checkOutcome(dealerBust, updatedDealerCards);
      }
    }
    drawCard();
  }

  function disableAllButtons() {
    disableDoubleButton(true);
    disableHitButton(true);
    disableSplitButton(true);
    disableSurrenderButton(true);
    disableStandButton(true);
  }

  function resetButtons() {
    disableDoubleButton(true);
    disableHitButton(true);
    disableSplitButton(true);
    disableSurrenderButton(true);
    disableStandButton(true);
  }

  // -----------------------------------------------------
  // - Outcome Logic
  // -----------------------------------------------------

  function compareHands(handIndex, updatedDealerCards) {
    updateCardsTestArray();
    updatePlayerBetAmountArray();
    let playerVal = sumFinalValues(playerCardsTestArray[handIndex]);
    let dealerVal = sumFinalValues(updatedDealerCards);
    if (playerVal > 21) {
      lose(handIndex);
    } else if (playerVal === dealerVal) {
      push(handIndex);
    } else if (playerVal > dealerVal) {
      win(handIndex);
    } else {
      lose(handIndex);
    }
  }

  function didBust(handArray) {
    if (sumFinalValues(handArray) > 21) {
      return true;
    } else {
      return false;
    }
  }

  function checkOutcome(dealerBust, updatedDealerCards) {
    setHiddenCard(false);
    updateCardsTestArray();
    updatePlayerBetAmountArray();
    if (dealerBust) {
      for (let handIndex in playerCardsTestArray) {
        console.log(`${sumFinalValues(playerCardsTestArray[handIndex])} || ${sumFinalValues(updatedDealerCards)}`);
        if (didBust(playerCardsTestArray[handIndex])) {
          lose(handIndex);
        } else {
          win(handIndex);
        }
      }
    } else {
      for (let handIndex in playerCardsTestArray) {
        console.log(`${sumFinalValues(playerCardsTestArray[handIndex])} || ${sumFinalValues(updatedDealerCards)}`);
        compareHands(handIndex, updatedDealerCards);
      }
    }

    setGameInProgress(false);
    resetButtons();
    setGameCount(prevCount => prevCount + 1);
  }

  function win(handIndex) {
    setWinCount(prevCount => prevCount + 1);
    winnings = betAmountTestArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(`bet amt------`);
    console.log(betAmountTestArray);
    console.log(`winnings ${winnings}`);
    setBank(prevAmount => prevAmount + winnings);
    console.log(handIndex, 'win');
  }

  function lose(handIndex) {
    setLoseCount(prevCount => prevCount + 1);
    betAmountTestArray[handIndex] = betAmountTestArray[handIndex] * -1;
    console.log(`bet amt------`);
    console.log(betAmountTestArray);
    winnings = betAmountTestArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(`losses ${winnings}`);
    setBank(prevAmount => prevAmount + winnings);
    console.log(handIndex, 'lose');
  }

  function push(handIndex) {
    setPushCount(prevCount => prevCount + 1);
    betAmountTestArray[handIndex] = betAmountTestArray[handIndex] * 0;
    console.log(`bet amt------`);
    console.log(betAmountTestArray);
    winnings = betAmountTestArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(handIndex, 'push');
  }

  // function checkNeedsShuffle(cutIndex, currentIndex) {
  //   if (cutIndex < currentIndex) {
  //     setNeedsShuffle(true);
  //   }
  // }

  // -----------------------------------------------------
  // -
  // -----------------------------------------------------
  const actions = {
    deal: {
      func: () => deal(),
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
      func: () => {
        resetTable();
        shuffleDecks();
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
    printPlayer: () => {
      console.log(`player cards`);
      console.log(playerCards);
      console.log(`dealer cards`);
      console.log(dealerCards);
      console.log(`bet array`);
      console.log(betAmountArray);
    },
    printDeck: () => console.log(playingDeck),
    printDeckCount: () => console.log(playingDeck.length),
    printPile: () => console.log(pile),
    printStates: () => {
      // console.log(`x = ${x}`);
      console.log(`winnings = ${winnings}`);
      console.log(`betAmount = ${betAmount}`);
    },
    printAce: () => console.log(sumWithAce(playerCards[0])),
    // checkNum: () => checkNum(),
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
        gameCount,
        setGameCount,
        winCount,
        setWinCount,
        pushCount,
        setPushCount,
        loseCount,
        setLoseCount,
        bank,
        setBank,
        betAmount,
        setBetAmount,

        hasInitialized,
        mitCount,

        actions,
        devActions,
      }}
    >
      <div className="top flex-column">
        <TopBar />
        <PlayArea />
        <PlayerStats />
        <BottomBar />
      </div>
    </GameContext.Provider>
  );
}

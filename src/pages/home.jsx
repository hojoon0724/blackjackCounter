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

  const hasInitialized = useRef(false);
  const mitCount = sumMitCount(pile);
  let winnings = 0;

  let cardIndexModifier = -1;
  let currentHand = [];

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
    setGameInProgress(true);
    setHiddenCard(true);
    let dealersHand = [];
    let playersHand = [[]];
    let cardsToPile = [...pile];

    // use dealCard function to deal
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

    if (sumFinalValues(playersHand[0]) === 21) {
      win(currentHandIndex);
    }

    // if (playersHand.length >= 2 && playersHand[0].value === playersHand[1].value) {
    //   console.log(`same values ${playersHand[0].value} // ${playersHand[1].value}`);
    //   disableSplitButton(false);
    // }
    disableSplitButton(false);
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

    updatedPlayerCards[currentHandIndex] = dealCard(updatedPlayerCards[currentHandIndex]);
    setPlayerCards(updatedPlayerCards);
  }

  function double(currentHandIndex) {
    winnings = betAmount * 2;
    let updatedPlayerCards = [...playerCards];
    updatedPlayerCards[currentHandIndex] = dealCard(playerCards[currentHandIndex]);
    setPlayerCards(updatedPlayerCards);
    stand(currentHandIndex);
  }

  function hit(currentHandIndex) {
    disableSurrenderButton(true);
    disableDoubleButton(true);

    let updatedPlayerCards = [...playerCards];
    updatedPlayerCards[currentHandIndex] = dealCard(playerCards[currentHandIndex]);
    setPlayerCards(updatedPlayerCards);

    if (sumFinalValues(updatedPlayerCards[currentHandIndex]) >= 21) {
      stand(currentHandIndex);
    }
  }

  function stand(currentHandIndex) {
    if (currentHand.length !== 0) {
    }
    if (playerCards.length - 1 > currentHandIndex) {
      setCurrentHandIndex(currentHandIndex + 1);
      hit(currentHandIndex + 1);
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
        console.log(`deckIndex ${deckIndex}`);
        console.log(`newDrawCardIndex ${newDrawCardIndex}`);
        updatedDealerCards.push(playingDeck[newDrawCardIndex]);
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
    let playerVal = sumFinalValues(playerCards[handIndex]);
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
    if (dealerBust) {
      for (let handIndex in playerCards) {
        console.log(`${sumFinalValues(playerCards[handIndex])} || ${sumFinalValues(updatedDealerCards)}`);
        if (didBust(playerCards[handIndex])) {
          lose(handIndex);
        } else {
          win(handIndex);
        }
      }
    } else {
      for (let handIndex in playerCards) {
        console.log(`${sumFinalValues(playerCards[handIndex])} || ${sumFinalValues(updatedDealerCards)}`);
        compareHands(handIndex, updatedDealerCards);
      }
    }

    setGameInProgress(false);
    resetButtons();
    setGameCount(prevCount => prevCount + 1);
  }

  function win(handIndex) {
    setWinCount(prevCount => prevCount + 1);
    winnings += betAmount;
    console.log(bank);
    console.log(`bet ${betAmount}`);
    console.log(`winnings ${winnings}`);
    setBank(bank + winnings);
    console.log(handIndex, 'win');
  }

  function lose(handIndex) {
    setLoseCount(prevCount => prevCount + 1);
    winnings -= betAmount;
    console.log(bank);
    console.log(`bet ${betAmount}`);
    console.log(`losses ${winnings}`);
    setBank(bank + winnings);
    console.log(handIndex, 'lose');
  }

  function push(handIndex) {
    setPushCount(prevCount => prevCount + 1);
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
    printPlayer: () => console.log(playerCards),
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

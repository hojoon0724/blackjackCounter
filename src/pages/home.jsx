import { useState, useEffect, useRef, createContext } from 'react';

// Process functions
import { getNewDeck } from '../gameLogic/deckAssembly';
import {
  getHandsSumInt,
  getHandsSumString,
  isBlackjack,
  dealerShowingAce,
  dealerShowingTen,
  sumMitCount,
} from '../gameLogic/mathFunctions';
import { aceExists, canSplit, getRandomInRange } from '../gameLogic/helperFunctions';

// UI Components
import TopBar from '../components/ui/topBar';
import BottomBar from '../components/ui/bottomBar';
import PlayArea from '../components/playArea/playArea';
import PlayerStats from '../components/ui/playerStats';

export const GameContext = createContext();

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  const [playingDeck, setPlayingDeck] = useState([]);

  const [deckIndex, setDeckIndex] = useState(0);
  const [cutIndex, setCutIndex] = useState(deckAmount * 48);

  const [gameInProgress, setGameInProgress] = useState(false);
  const [askInsurance, setAskInsurance] = useState(false);

  const [dealerCards, setDealerCards] = useState([]);
  const [hiddenCard, setHiddenCard] = useState(true);
  const [playerCards, setPlayerCards] = useState([]);
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
  const [betAmount, setBetAmount] = useState(0);
  const [insuranceBet, setInsuranceBet] = useState(betAmount / 2);
  // const maxInsurance = betAmount / 2;
  const [winningsArray, setWinningsArray] = useState([betAmount]);
  const [handOutcomes, setHandOutcomes] = useState([]);

  const hasInitialized = useRef(false);
  const mitCount = sumMitCount(pile);

  let winnings = 0;

  let cardIndexModifier = -1;
  let liveDealerCards = [];
  let livePlayerCards = [];
  let liveWinningsArray = [];
  let liveHandOutcomes = [];

  useEffect(() => {
    if (!hasInitialized.current) {
      createNewTable(deckAmount);
      hasInitialized.current = true;
    }
  }, [deckAmount]);

  useEffect(() => {
    setBank(prevAmt => prevAmt - betAmount);
  }, [betAmount]);

  function createNewTable(deckAmount) {
    let newDeck = getNewDeck(deckAmount);
    setPlayingDeck(newDeck);
    setGameInProgress(false);
  }

  // -----------------------------------------------------
  // - Play Logic
  // -----------------------------------------------------

  function deal() {
    startNewGame();

    liveWinningsArray = [betAmount];
    liveHandOutcomes = ['In Play'];

    for (let i = 0; i < 2; i++) {
      livePlayerCards[0] = dealCard(livePlayerCards[0]);
      liveDealerCards = dealCard(liveDealerCards);
    }

    setPlayerCards(livePlayerCards);
    setDealerCards(liveDealerCards);

    disableDoubleButton(false);
    disableHitButton(false);
    disableStandButton(false);
    disableSurrenderButton(false);
    if (livePlayerCards[0][0].value === livePlayerCards[0][1].value) {
    }
    disableSplitButton(false);

    if (isBlackjack(livePlayerCards[0])) {
      liveWinningsArray[0] *= 1.5;
      liveHandOutcomes[0] = ['Blackjack'];
      setTimeout(() => {
        stand(currentHandIndex);
      }, 1000);
    } else {
      if (dealerShowingAce(liveDealerCards)) {
        setAskInsurance(true);
      }

      if (dealerShowingTen(liveDealerCards)) {
        setTimeout(() => {
          if (isBlackjack(liveDealerCards)) {
            checkOutcome(currentHandIndex);
          }
        }, 1500);
      }
    }

    setData();
  }

  function split(currentHandIndex) {
    updateLiveData();
    disableSurrenderButton(true);

    // const additionalBet = addBet();
    liveWinningsArray = [...liveWinningsArray, addBet()];
    liveHandOutcomes = [...liveHandOutcomes, 'Split'];

    let newHand = [livePlayerCards[currentHandIndex][1]];
    livePlayerCards = [...livePlayerCards, newHand];
    livePlayerCards[currentHandIndex].pop();
    if (livePlayerCards[0][0].value === 1 && livePlayerCards[1][0].value === 1) {
      setTimeout(() => {
        livePlayerCards[currentHandIndex] = dealCard(livePlayerCards[currentHandIndex]);
      }, 250);
      setTimeout(() => {
        livePlayerCards[currentHandIndex + 1] = dealCard(livePlayerCards[currentHandIndex + 1]);
      }, 500);
      setTimeout(() => {
        checkOutcome(currentHandIndex);
      }, 2000);
    } else {
      livePlayerCards[currentHandIndex] = dealCard(livePlayerCards[currentHandIndex]);

      if (isBlackjack(livePlayerCards[currentHandIndex])) {
        liveHandOutcomes[currentHandIndex] = 'Blackjack';
        stand(currentHandIndex);
      }
    }

    setData();
  }

  function double(currentHandIndex) {
    updateLiveData();

    liveWinningsArray[currentHandIndex] += addBet();

    livePlayerCards[currentHandIndex] = dealCard(livePlayerCards[currentHandIndex]);
    stand(currentHandIndex);

    setData();
  }

  function hit(currentHandIndex) {
    disableSurrenderButton(true);
    updateLiveData();

    livePlayerCards[currentHandIndex] = dealCard(livePlayerCards[currentHandIndex]);
    liveHandOutcomes[currentHandIndex] = ['In Play'];

    if (livePlayerCards[currentHandIndex].length > 2) {
      disableDoubleButton(true);
    } else {
      disableDoubleButton(false);
    }

    if (!canSplit(livePlayerCards[currentHandIndex])) {
      disableSplitButton(true);
    }

    if (getHandsSumInt(livePlayerCards[currentHandIndex]) === 21) {
      stand(currentHandIndex);
    }

    if (getHandsSumInt(livePlayerCards[currentHandIndex]) > 21) {
      if (livePlayerCards.length === 1) {
        setTimeout(() => {
          checkOutcome(false);
        }, 750);
      } else {
        stand(currentHandIndex);
      }
    }

    setData();
  }

  function stand(currentHandIndex) {
    updateLiveData();
    liveHandOutcomes[currentHandIndex] = 'Stand';

    if (currentHandIndex < livePlayerCards.length - 1) {
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
      }, 1200);
    }
  }

  function surrender() {
    updateLiveData();
    liveWinningsArray[0] *= 0.5;
    livePlayerCards = [[]];
    checkOutcome(false);
  }

  function refuseInsurance() {
    updateLiveData();

    if (isBlackjack(liveDealerCards)) {
      setHiddenCard(false);
      checkOutcome(currentHandIndex);
      setAskInsurance(false);
    } else {
      setAskInsurance(false);
    }
  }
  function payInsurance() {
    updateLiveData();
    if (isBlackjack(liveDealerCards)) {
      setHiddenCard(false);
      checkOutcome(currentHandIndex);
      setAskInsurance(false);
      setBank(prevAmt => prevAmt + insuranceBet * 2);
    } else {
      setBank(prevAmt => prevAmt - insuranceBet);
      setAskInsurance(false);
    }
  }

  function addBet() {
    setBank(prevAmt => prevAmt - betAmount);
    return betAmount;
  }

  // -----------------------------------------------------
  // - Processing Logic
  // -----------------------------------------------------

  function startNewGame() {
    setCurrentHandIndex(0);
    setGameInProgress(true);
    setHiddenCard(true);

    livePlayerCards = [[]];
    liveDealerCards = [];
    liveWinningsArray = [betAmount];
  }

  function resetTable() {
    setPlayingDeck([]);
    setDealerCards([]);
    setPlayerCards([[]]);
    setPile([]);
    setDeckIndex(0);
    // setInsuranceBet(0);
    resetButtons();
  }

  function nextCardsIndex() {
    cardIndexModifier++;
    setDeckIndex(prevNum => prevNum + 1);
    return deckIndex + cardIndexModifier;
  }

  function updateLiveData() {
    if (livePlayerCards.length === 0) {
      livePlayerCards = playerCards;
    }
    if (liveDealerCards.length === 0) {
      liveDealerCards = dealerCards;
    }
    if (liveWinningsArray.length === 0) {
      liveWinningsArray = winningsArray;
    }
    if (liveHandOutcomes.length === 0) {
      liveHandOutcomes = handOutcomes;
    }
  }

  function setData() {
    if (livePlayerCards.length !== 0) {
      setPlayerCards(livePlayerCards);
    }
    if (liveDealerCards.length !== 0) {
      setDealerCards(liveDealerCards);
    }
    if (liveWinningsArray.length !== 0) {
      setWinningsArray(liveWinningsArray);
    }
    if (liveHandOutcomes.length !== 0) {
      setHandOutcomes(liveHandOutcomes);
    }
  }

  function dealCard(targetArray) {
    const newCard = playingDeck[nextCardsIndex()];
    setPile(prevPile => [...prevPile, newCard]);
    let handWithNewCard = [...targetArray, newCard];
    return handWithNewCard;
  }

  function dealerPlay() {
    updateLiveData();
    let dealerBust = false;
    let soft17 = aceExists(liveDealerCards) ? true : false;

    function drawCard() {
      if (getHandsSumInt(liveDealerCards) < 17) {
        liveDealerCards = dealCard(liveDealerCards);
        setTimeout(drawCard, 1000);
      } else if (getHandsSumInt(liveDealerCards) === 17 && soft17) {
        liveDealerCards = dealCard(liveDealerCards);
        soft17 = false;
        setTimeout(drawCard, 1000);
      } else if (getHandsSumInt(liveDealerCards) > 21) {
        dealerBust = true;
        checkOutcome(dealerBust);
      } else if (getHandsSumInt(liveDealerCards) >= 17) {
        checkOutcome(dealerBust);
      }
      setData();
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
  function checkOutcome(dealerBust) {
    updateLiveData();
    setHiddenCard(false);

    if (dealerBust) {
      for (let handIndex in livePlayerCards) {
        if (didBust(livePlayerCards[handIndex])) {
          lose(handIndex);
        } else {
          win(handIndex);
        }
      }
    } else {
      for (let handIndex in livePlayerCards) {
        compareHands(handIndex);
      }
    }
    setGameCount(prevCount => prevCount + 1);
    checkNeedsShuffle();
    calculatePayout();
  }

  function compareHands(handIndex) {
    updateLiveData();
    let playerVal = getHandsSumInt(livePlayerCards[handIndex]);
    let dealerVal = getHandsSumInt(liveDealerCards);
    if (playerVal > 21) {
      lose(handIndex);
    } else if (playerVal === dealerVal) {
      push(handIndex);
    } else if (playerVal > dealerVal) {
      win(handIndex);
    } else if (playerVal < dealerVal) {
      lose(handIndex);
    }
    setData();
  }

  function didBust(handArray) {
    if (getHandsSumInt(handArray) > 21) {
      return true;
    } else {
      return false;
    }
  }

  function win(handIndex) {
    updateLiveData();
    setWinCount(prevCount => prevCount + 1);
    liveWinningsArray[handIndex] = liveWinningsArray[handIndex] * 2;
    liveHandOutcomes[handIndex] = 'Win';
    setData();
  }

  function lose(handIndex) {
    updateLiveData();
    setLoseCount(prevCount => prevCount + 1);
    liveWinningsArray[handIndex] = liveWinningsArray[handIndex] * 0;
    liveHandOutcomes[handIndex] = 'Lost';
    setData();
  }

  function push(handIndex) {
    updateLiveData();
    setPushCount(prevCount => prevCount + 1);
    liveWinningsArray[handIndex] = liveWinningsArray[handIndex] * 1;
    liveHandOutcomes[handIndex] = 'Push';
    setData();
  }

  function calculatePayout() {
    updateLiveData();
    winnings = liveWinningsArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setBank(prevAmt => prevAmt + winnings);
    setGameInProgress(false);
    resetButtons();
  }

  function checkNeedsShuffle() {
    if (deckIndex > cutIndex) {
      createNewTable(deckAmount);
      setPile([]);

      setCutIndex(getRandomInRange(deckAmount));
    }
  }

  // -----------------------------------------------------
  // -
  // -----------------------------------------------------
  const actions = {
    deal: {
      func: () => deal(),
      disabled: betAmount <= 0 ? true : false,
    },
    refuseInsurance: {
      func: () => refuseInsurance(),
    },
    payInsurance: {
      func: () => payInsurance(),
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
      func: () => surrender(),
      disabled: surrenderButton,
    },
    resetDeck: {
      func: () => {
        resetTable();
        createNewTable(deckAmount);
        setSettingsModalIsOpen(false);
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

    printCardArrays: () => {
      console.log(`player cards`);
      console.log(playerCards);
      console.log(`dealer cards`);
      console.log(dealerCards);
      console.log(`bet array`);
      console.log(winningsArray);
      console.log(`${getHandsSumInt(playerCards[0])} || ${getHandsSumInt(dealerCards)}`);
    },

    printStates: () => {
      console.log(`winningsArray`);
      console.log(winningsArray);
      console.log(`insuranceBet`);
      console.log(insuranceBet);
    },

    printMoney: () => {
      console.log('----------');
      console.log(`bank: ${bank}`);
      console.log(`betAmount: ${betAmount}`);
      console.log(`winningsArray`);
      console.log(winningsArray);
      console.log(`insuranceBet ${insuranceBet}`);
      console.log('----------');
    },

    printAce: () => console.log(getHandsSumString(playerCards[0])),

    checkIfBlackjack: () => console.log(isBlackjack(playerCards[0])),
    getHandsSumString: () => console.log(getHandsSumString(playerCards[0])),
    getHandsSumInt: () => console.log(getHandsSumInt(playerCards[0])),
    dealerShowingAce: () => console.log(dealerShowingAce(playerCards[0])),
  };

  return (
    <GameContext.Provider
      value={{
        deckAmount,
        setDeckAmount,
        gameInProgress,
        askInsurance,

        dealerCards,
        hiddenCard,
        playerCards,
        currentHandIndex,

        splitButton,
        doubleButton,
        hitButton,
        standButton,
        surrenderButton,
        settingsModalIsOpen,
        setSettingsModalIsOpen,

        pile,

        gameCount,
        winCount,
        pushCount,
        loseCount,

        bank,
        setBank,
        betAmount,
        setBetAmount,
        insuranceBet,
        setInsuranceBet,
        winningsArray,
        handOutcomes,

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

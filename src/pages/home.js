import { useState } from 'react';
import cardDeckAssembly from '../components/cardAssembly';
import shuffleDeck from '../components/shuffleDeck';
import DeckAmountInput from '../components/deckAmountInput';
import TopBar from '../components/topBar';
import BottomBar from '../components/bottomBar';

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  let cardDeck = cardDeckAssembly(deckAmount);
  let playingDeck = shuffleDeck(cardDeck);

  return (
    <div className="top flex-column">
      <TopBar />
      <p>stuff goes here</p>
      <DeckAmountInput deckAmount={deckAmount} setDeckAmount={setDeckAmount} />
      <BottomBar />
    </div>
  );
}

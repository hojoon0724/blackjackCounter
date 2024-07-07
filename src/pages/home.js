import { useState } from 'react';
import cardDeckAssembly from '../components/cardAssembly';
import shuffleDeck from '../components/shuffleDeck';
import TopBar from '../components/topBar';
import BottomBar from '../components/bottomBar';
import PlayArea from '../components/playArea';

export default function Home() {
  const [deckAmount, setDeckAmount] = useState(6);
  let cardDeck = cardDeckAssembly(deckAmount);
  let playingDeck = shuffleDeck(cardDeck);

  return (
    <div className="top flex-column">
      <TopBar deckAmount={deckAmount} setDeckAmount={setDeckAmount} />
      <PlayArea />
      <BottomBar />
    </div>
  );
}

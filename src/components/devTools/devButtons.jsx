import { useContext } from 'react';
import { GameContext } from '../../pages/home';

export default function DevButtons() {
  const { devActions } = useContext(GameContext);

  return (
    <div
      className="dev-buttons-container flex-column"
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
        left: 0,
        paddingBottom: '80px',
      }}
    >
      {/* 
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.flipHidden}>
        flipHidden
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.addToDealer}>
        addToDealer
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printDealer}>
        dealer array
      </button>

      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printDeck}>
        printDeck
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printDeckCount}>
        printDeckCount
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printPile}>
        printPile
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printAce}>
        ace check
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.dealNext}>
        dealNext
      </button> 
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.checkNum}>
        checkNum
      </button>
      */}
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printStates}>
        printStates
      </button>
      <button style={{ fontSize: '1rem', margin: '.5rem' }} onClick={devActions.printPlayer}>
        printPlayer
      </button>
    </div>
  );
}

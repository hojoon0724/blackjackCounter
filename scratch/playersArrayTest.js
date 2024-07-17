import { useState } from 'react';

let players = [['player[0]'], ['player[1]'], ['player[2]'], ['player[3]'], ['player[4]'], ['player[5]']];

let playersWithCards = [
  [
    // ['player[0]stack[0]card[0]', 'player[0]stack[0]card[1]']
  ],
  [
    ['player[1]stack[0]card[0]', 'player[1]stack[0]card[1]'],
    ['player[1]stack[1]card[0]', 'player[1]stack[1]card[1]'],
  ],
  [
    ['player[2]stack[0]card[0]', 'player[2]stack[0]card[1]'],
    ['player[2]stack[1]card[0]', 'player[2]stack[1]card[1]'],
  ],
  [],
  [
    ['player[4]stack[0]card[0]', 'player[4]stack[0]card[1]'],
    ['player[4]stack[1]card[0]', 'player[4]stack[1]card[1]'],
    ['player[4]stack[2]card[0]', 'player[4]stack[2]card[1]'],
  ],
  [['player[5]stack[0]card[0]', 'player[5]stack[0]card[1]']],
];

function printPlayerArray(array) {
  for (player = 0; player < array.length; player++) {
    if (array[player].length > 0) {
      for (stack = 0; stack < array[player].length; stack++) {
        console.log(array[player][stack], player, stack);
      }
    }
  }
}

printPlayerArray(playersWithCards);

const [cardArray, setCardArray] = useState([]);

function resetArray() {
  setCardArray([]);
}

{
  cardArray.map((card, index) => {
    return (
      <motion.div
        className="face-down-card"
        transition={{ duration: 0.5, delay: index < 2 ? index * 0.5 + 0.2 : 0, ease: 'circInOut' }}
        initial={{ opacity: 0, perspective: 1000 }}
        animate={{ opacity: 1, perspective: 1000 }}
        exit={{ opacity: 0, duration: 0.5 }}
        key={`${card.name}-${index}`}
        style={{ transform: `translateX(${25 * index}%) translateY(${-117.85 * index}%)` }}
      ></motion.div>
    );
  });
}

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

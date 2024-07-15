let players = [['player[0]'], ['player[1]'], ['player[2]'], ['player[3]'], ['player[4]'], ['player[5]']];

let playersWithCards = [
  ['player[0]card[0]', 'player[0]card[1]'],
  ['player[1]card[0]', 'player[1]card[1]'],
  ['player[2]card[0]', 'player[2]card[1]'],
  ['player[3]card[0]', 'player[3]card[1]'],
  ['player[4]card[0]', 'player[4]card[1]'],
  ['player[5]card[0]', 'player[5]card[1]'],
];

function printPlayerArray(array) {
  for (i = 0; i < array.length; i++) {
    console.log(array[i]);
    for (j = 0; j < array[i].length; j++) {
      console.log(array[i][j]);
    }
  }
}

printPlayerArray(playersWithCards);

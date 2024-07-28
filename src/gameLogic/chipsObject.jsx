export const chipsObject = {
  1: {
    amount: 1,
    color: '#e8e8e8',
    text: 'black',
  },
  5: {
    amount: 5,
    color: '#ff3a3a',
    text: 'black',
  },
  10: {
    amount: 10,
    color: '#fc8814',
    text: 'black',
  },
  25: {
    amount: 25,
    color: '#1e6f00',
    text: 'white',
  },
  50: {
    amount: 50,
    color: '#000d9f',
    text: 'white',
  },
  100: {
    amount: 100,
    color: '#4a4a4a',
    text: 'white',
  },
  500: {
    amount: 500,
    color: '#6d00e2',
    text: 'white',
  },
  1000: {
    amount: 1000,
    color: '#ffe62b',
    text: 'black',
  },
};

export function getBettingChipsArray(num) {
  let chipsArray = [];
  let remaining = num;
  Object.entries(chipsObject)
    .toReversed()
    .map(([key, chip]) => {
      let chipCount = 0;
      chipCount = Math.floor(remaining / key);
      chipsArray.push(chipCount);
      remaining = remaining - chipCount * key;
    });
  return chipsArray;
}

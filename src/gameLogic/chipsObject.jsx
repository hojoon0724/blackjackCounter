export const chipsObject = {
  1000: {
    amount: 1000,
    label: '1k',
    color: '#ffe62b',
    text: 'black',
  },
  500: {
    amount: 500,
    label: 500,
    color: '#6d00e2',
    text: 'white',
  },
  100: {
    amount: 100,
    label: 100,
    color: '#4a4a4a',
    text: 'white',
  },
  50: {
    amount: 50,
    label: 50,
    color: '#000d9f',
    text: 'white',
  },
  25: {
    amount: 25,
    label: 25,
    color: '#1e6f00',
    text: 'white',
  },
  10: {
    amount: 10,
    label: 10,
    color: '#fc8814',
    text: 'black',
  },
  5: {
    amount: 5,
    label: 5,
    color: '#ff3a3a',
    text: 'black',
  },
  1: {
    amount: 1,
    label: 1,
    color: '#e8e8e8',
    text: 'black',
  },
};

export function getBettingChipsArray(num) {
  let chipsArray = [];
  let remaining = num;
  // eslint-disable-next-line
  Object.entries(chipsObject).map(([key, chip]) => {
    let chipCount = 0;

    chipCount = Math.floor(remaining / key);
    chipsArray.push(chipCount);
    remaining = remaining - chipCount * key;
  });
  return chipsArray;
}

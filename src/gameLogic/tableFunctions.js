const chipsObject = {
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

function getChipsBreakdownObject(amount) {
  let breakdownObject = {};
  let remaining = amount;
  Object.entries(chipsObject)
    .toReversed()
    .map(([key, chip]) => {
      let quantity = Math.floor(remaining / key);
      let newRemaining = remaining % key;

      console.log(`key: ${key} // quantity: ${quantity} // newRemaining: ${newRemaining}`);

      breakdownObject = { ...breakdownObject, [key]: quantity };
      remaining = newRemaining;
    });

  return breakdownObject;
}

function getChipsStackArray(breakdownObject) {
  let stackArray = [];
  Object.entries(breakdownObject)
    .toReversed()
    .map(([key, value]) => {
      for (let quantity = value; quantity > 0; quantity--) {
        stackArray.push(parseInt(key));
      }
    });
  return stackArray;
}

console.log(getChipsStackArray(getChipsBreakdownObject(1234)));

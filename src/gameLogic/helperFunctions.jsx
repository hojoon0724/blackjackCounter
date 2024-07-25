// Used in isBlackjack() && soft17
export function aceExists(handArray) {
  const aceBool = handArray.some(card => card.value === 1);
  return aceBool;
}

// used in isBlackjack()
export function thereAreTwoCards(handArray) {
  if (handArray.length === 2) {
    return true;
  } else {
    return false;
  }
}

// used in getHandsSumString() && getHandsSumInt()
export function getHandsSumRaw(handArray) {
  const sumOfValues = handArray.reduce((n, { value }) => n + value, 0);
  return sumOfValues;
}

export function canSplit(handArray) {
  if (handArray[0].vaue === handArray[1].vaue && thereAreTwoCards(handArray)) {
    return true;
  } else {
    return false;
  }
}

export function getRandomInRange(deckAmount) {
  const totalCardAmt = deckAmount * 52;
  const min = totalCardAmt * 0.75;
  const max = totalCardAmt * 0.85;

  return Math.floor(Math.random() * (max - min) + min);
}

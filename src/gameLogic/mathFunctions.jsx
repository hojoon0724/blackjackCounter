import { aceExists, thereAreTwoCards, getHandsSumRaw } from './helperFunctions';

export function getHandsSumInt(handArray) {
  const aceBool = aceExists(handArray);
  const rawValue = getHandsSumRaw(handArray);
  if (handArray.length === 2 && rawValue === 11 && aceBool) {
    return 21;
  } else if (aceBool && rawValue + 10 < 22) {
    return rawValue + 10;
  } else {
    return rawValue;
  }
}

export function getHandsSumString(handArray) {
  const rawValue = getHandsSumRaw(handArray);
  const aceBool = aceExists(handArray);
  if (aceBool && rawValue + 10 < 22) {
    return `${rawValue + 10}/${rawValue}`;
  } else {
    return rawValue;
  }
}

export function isBlackjack(handArray) {
  if (thereAreTwoCards(handArray) === true && getHandsSumInt(handArray) === 21) {
    return true;
  } else {
    return false;
  }
}

export function dealerShowingAce(handArray) {
  if (handArray[1].value === 1) {
    return true;
  } else {
    return false;
  }
}

export function dealerShowingTen(handArray) {
  if (handArray[1].value === 10) {
    return true;
  } else {
    return false;
  }
}

export function sumMitCount(pileArray) {
  const mitCountSum = pileArray.reduce((n, { mitCountValue }) => n + mitCountValue, 0);
  return mitCountSum;
}

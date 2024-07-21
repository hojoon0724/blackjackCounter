import { useState } from 'react';

const [num, setNum] = useState(0);

console.log(num);

function increase() {
  setNum(prevVal => {
    console.log(`update 1 ${prevVal}`);
    console.log(`print num ${num}`);
    return prevVal + 1;
  });
  setNum(prevVal => {
    console.log(`update 2 ${prevVal}`);
    console.log(`print num ${num}`);
    return prevVal + 1;
  });
  setNum(prevVal => {
    console.log(`update 3 ${prevVal}`);
    console.log(`print num ${num}`);
    return prevVal + 1;
  });
}

increase(num);

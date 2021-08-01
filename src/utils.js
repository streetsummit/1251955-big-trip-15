const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomLengthArray = (array, min = 0, max = array.length) => {
  const dataArray = array.slice();
  const randomLengthArray = [];
  const randomLength = getRandomInteger(min, max);
  for (let i = 0; i < randomLength; i++) {
    const position = getRandomInteger(0, dataArray.length - 1);
    const element = dataArray.splice(position, 1)[0];
    randomLengthArray.push(element);
  }
  return randomLengthArray;
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomLengthArray
};

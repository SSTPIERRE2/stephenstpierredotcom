/**
 * Custom debounce function based on the FCC version https://www.freecodecamp.org/news/javascript-debounce-example/
 * Adds tracking the number of times the inner function was called before the debounced function was finally executed
 * @param func the function to debounce
 * @param timeout how long to wait before executing the function
 * @returns
 */
const debounce = (func: Function, timeout = 300) => {
  let timer: NodeJS.Timeout | undefined;
  let count = 0;

  return (...args: unknown[]) => {
    count++;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, [...args, count]);
      count = 0;
    }, timeout);
  };
};

/**
 * Custom debounced cursor thrash tracking function
 * @param func the function to debounce
 * @param timeout how long to wait before executing the function
 * @returns
 */
export const handleCursorThrash = (func: Function, timeout = 300) => {
  let timer: NodeJS.Timeout | undefined;
  let previousTimestamp = 0;
  let numOfThrashes = 0;
  let totalTimeElapsed = 0;

  return (...args: [MouseEvent]) => {
    const [event] = args;
    const currentTimestamp = Date.now();
    let timeElapsed = 0;

    if (previousTimestamp) {
      timeElapsed = currentTimestamp - previousTimestamp || 1;
      const speedX = Math.abs(event.movementX / timeElapsed);
      const speedY = Math.abs(event.movementY / timeElapsed);

      // Define a threshold to differentiate erratic movement
      const erraticThreshold = 20;

      if (speedX > erraticThreshold || speedY > erraticThreshold) {
        console.log(
          'Erratic mouse movement detected',
          timeElapsed,
          speedX,
          speedY,
          event.movementX,
          event.movementY
        );
        numOfThrashes++;
      }
    }

    clearTimeout(timer);
    previousTimestamp = currentTimestamp;
    totalTimeElapsed += timeElapsed;

    timer = setTimeout(() => {
      const didThrash = numOfThrashes > 2;

      // Finally call debounced function
      func.apply(this, [
        ...args,
        didThrash,
        totalTimeElapsed / 1000,
        numOfThrashes,
      ]);

      // Reset top-level state
      numOfThrashes = 0;
      previousTimestamp = 0;
      totalTimeElapsed = 0;
    }, timeout);
  };
};

export default debounce;

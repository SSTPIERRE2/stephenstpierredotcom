/**
 * Custom debounce function based on the FCC version https://www.freecodecamp.org/news/javascript-debounce-example/
 * Adds tracking the number of times the inner function was called before the debounced function was finally executed
 * @param func the function to debounce
 * @param timeout how long to wait before executing the function
 * @returns
 */
const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  timeout = 300,
) => {
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

const getMouseXDirection = (movement: number) =>
  movement === 0 ? undefined
  : movement > 0 ? 'right'
  : 'left';

const getMouseYDirection = (movement: number) =>
  movement === 0 ? undefined
  : movement > 0 ? 'down'
  : 'up';

/**
 * Custom debounced cursor thrash tracking function
 * - I think the main criteria is an unreasonable number of cursor direction changes within a set of movements. After about a half second, that set of movements should be considered finished and the next time the mouse moves it will be considered a new set.
 * - You may customize the timeout, but beware any shorter and movements won't be captured together as expected, any longer and groups of movements will be chained together unexpectedly.
 * - Long, sweeping motions primarily such as moving the cursor between screens would create false positives if we did not consider the **number of direction changes**. The primary motions to capture in my opinion are: user thrashing the cursor left & right or in a circle.
 * - Each circle is 4 direction changes, so I think about two to three full circles is fair to call a full-on thrash regardless of whether the cursor ever met the speed threshold.
 * - It's easier to move the cursor faster in a straighter, left/right or up/down path, so in that case I'd like to see at least one high-speed movement combined with a few direction changes.
 * @param func the function to debounce
 * @param timeout how long to wait before executing the function
 * @returns
 */
export const handleCursorThrash = <T extends (...args: unknown[]) => unknown>(
  func: T,
  timeout = 500,
) => {
  let timer: NodeJS.Timeout | undefined;
  let previousTimestamp = 0;
  let numOfThrashes = 0;
  let totalTimeElapsed = 0;
  let directionX: 'left' | 'right' | undefined;
  let directionY: 'up' | 'down' | undefined;
  let numOfDirectionChanges = 0;

  return (...args: [MouseEvent]) => {
    const [event] = args;
    const currentTimestamp = Date.now();
    const currentDirectionX = getMouseXDirection(event.movementX);
    const currentDirectionY = getMouseYDirection(event.movementY);
    let timeElapsed = 0;

    // Set the initial, standing X and Y direction
    if (!directionX && !!currentDirectionX) {
      directionX = currentDirectionX;
    }

    if (!directionY && !!currentDirectionY) {
      directionY = currentDirectionY;
    }

    // If either current direction changes, update the count and standing direction
    if (
      !!directionX &&
      !!currentDirectionX &&
      directionX !== currentDirectionX
    ) {
      numOfDirectionChanges++;
      directionX = directionX === 'left' ? 'right' : 'left';
      // console.log(`X direction changed`, currentDirectionX);
    }

    if (
      !!directionY &&
      !!currentDirectionY &&
      directionY !== currentDirectionY
    ) {
      numOfDirectionChanges++;
      directionY = directionY === 'up' ? 'down' : 'up';
      // console.log(`Y direction changed`, currentDirectionY);
    }

    // Wait until we have a previous timestamp to compare to so we can calculate time elapsed and speed
    if (previousTimestamp) {
      timeElapsed = currentTimestamp - previousTimestamp || 1;
      const speedX = Math.abs(event.movementX / timeElapsed);
      const speedY = Math.abs(event.movementY / timeElapsed);

      // Define a threshold to differentiate erratic movement
      const erraticThreshold = 10;

      if (speedX > erraticThreshold || speedY > erraticThreshold) {
        // console.log(
        //   'Erratic mouse movement detected',
        //   timeElapsed,
        //   speedX,
        //   speedY,
        //   event.movementX,
        //   event.movementY
        // );
        numOfThrashes++;
      }
    }

    clearTimeout(timer);
    previousTimestamp = currentTimestamp;
    totalTimeElapsed += timeElapsed;

    timer = setTimeout(() => {
      const didThrash =
        (numOfThrashes >= 2 && numOfDirectionChanges >= 6) ||
        numOfDirectionChanges >= 10;

      // Finally call debounced function
      func.apply(this, [
        ...args,
        didThrash,
        totalTimeElapsed / 1000,
        numOfThrashes,
        numOfDirectionChanges,
      ]);

      // Reset top-level state
      numOfThrashes = 0;
      numOfDirectionChanges = 0;
      previousTimestamp = 0;
      totalTimeElapsed = 0;
      directionX = undefined;
      directionY = undefined;
    }, timeout);
  };
};

export default debounce;

/**
 * Generates sequential elements from the given array in an infinite loop.
 *
 * @template T - The element type of the array.
 * @param {T[]} array - The array from which to generate sequential elements.
 * @yields {T} The next sequential element from the array.
 * @returns {Generator<T, T, T} A generator object that generates sequential elements from the array.
 */
export function* getSequentialArrayElement<T extends any[]>(
  array: T,
): Generator<T[number], T[number], T[number]> {
  let index = -1;
  while (true) {
    if (array.length - 1 <= index) {
      index = -1;
    }

    index += 1;
    yield array[index] || null;
  }
}

/**
 * Returns a random element from the given array.
 *
 * @template T - The element type of the array.
 * @param {T[]} array - The array from which to retrieve a random element.
 * @returns {T} A random element from the array.
 */
export const getRandomArrayElement = <T extends any[]>(array: T): T[number] => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

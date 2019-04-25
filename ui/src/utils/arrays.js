/**
 * Swaps index x with index y
 * [NOTE] Tolerates ilegal indexes. In that case returns the original array
 * @param {array} array
 * @param {number} x first index to swap
 * @param {number} y second index to swap
 * @returns {array}
 */
export function swapItems(array, x, y) {
  const minIdx = 0;
  const maxIdx = array.length - 1;
  if (x < minIdx || y < minIdx || x > maxIdx || y > maxIdx || x === y)
    return array;
  return Object.assign([], array, {
    [x]: array[y],
    [y]: array[x]
  });
}

/**
 * Deletes index x
 * [NOTE] Tolerates ilegal indexes. In that case returns the original array
 * @param {array} array
 * @param {number} x index to delete
 * @returns {array}
 */
export function deleteItem(array, x) {
  if (x < 0 || x > array.length - 1) return array;
  return [...array.slice(0, x), ...array.slice(x + 1)];
}

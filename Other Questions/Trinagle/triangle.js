/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let n = triangle.length;
  let cache = triangle[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      cache[j] = Math.min(triangle[i][j] + cache[j], triangle[i][j] + cache[j + 1]);
    }
  }

  return cache[0];
};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));

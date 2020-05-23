/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  for (let str of strs) {
    let count = countZeroesandOnes(str);
    for (let zeroes = m; zeroes >= count[0]; zeroes--) {
      for (let ones = n; ones >= count[1]; ones--) {
        dp[zeroes][ones] = Math.max(1 + dp[zeroes - count[0]][ones - count[1]], dp[zeroes][ones]);
      }
    }
  }
  return dp[m][n];
};

var countZeroesandOnes = (str) => {
  let c = [0, 0];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') c[0]++;
    else c[1]++;
  }
  return c;
};

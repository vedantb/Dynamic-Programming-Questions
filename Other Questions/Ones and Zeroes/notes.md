## Ones and Zeroes

Given an array, strs, with strings consisting of only 0s and 1s. Also two integers m and n.

Now your task is to find the maximum number of strings that you can form with given m 0s and n 1s. Each 0 and 1 can be used at most once.

Example 1:

```js
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: This are totally 4 strings can be formed by the using of 5 0s and 3 1s, which are "10","0001","1","0"
```

## Solution.

We use a dp table of size m \* n. We start iterating over the strings. For every string, we first calculate the number of 1s and 0s presentt.

dp[m,n] represents the max strings formed using m 0s and n 1s.

Once we have the number of 0s (`zeros`) and 1s (`ones`) for a string, we start iterating the dp table from dp[m][n] and go on till dp[zeroes][ones] in reverse oorder, to determine the maximum number of strings for every cell.

`dp[i][j] = Math.max(1 + dp[i - countOfZeros][j - countOfOnes], dp[i][j])`

```js
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
```

## Decode Ways

A message containing letters from A-Z is being encoded to numbers using the following mapping:

```
'A' -> 1
'B' -> 2
'C' -> 3
...
'Z' -> 26
```

Given a non-empty string containing only digits, determine the total number of ways to decode it.

## Basic Solution

The simple approach could be to iterate through the string and at every character we have two options:

1. Select the current character and recursively process the remaining characters incrementing index by 1
2. If the current character + next character < 26, we select the pair and increment the index by 2 and continue recursively processing the remaining characters.

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s) return 0;

  let numDecodingsHelper = (s, currentIndex) => {
    if (currentIndex === s.length) return 1;

    // If the string starts with a zero, it can't be decoded
    if (s[currentIndex] === '0') return 0;

    if (currentIndex === s.length - 1) return 1;

    let ans = numDecodingsHelper(s, currentIndex + 1);
    if (parseInt(s.substring(currentIndex, currentIndex + 2)) <= 26) {
      ans += numDecodingsHelper(s, currentIndex + 2);
    }

    return ans;
  };

  return numDecodingsHelper(s, 0);
};

console.log(`Number of Decodins --> ${numDecodings('2326')}`);
```

### Top-down Dynamic Programming with Memoization

We can easily take care of the subproblems using memoization

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s) return 0;
  const dp = [];

  let numDecodingsHelper = (s, currentIndex) => {
    if (currentIndex === s.length) return 1;

    // If the string starts with a zero, it can't be decoded
    if (s[currentIndex] === '0') return 0;

    if (currentIndex === s.length - 1) return 1;

    if (currentIndex in dp) return dp[currentIndex];

    let ans = numDecodingsHelper(s, currentIndex + 1);
    if (parseInt(s.substring(currentIndex, currentIndex + 2)) <= 26) {
      ans += numDecodingsHelper(s, currentIndex + 2);
    }

    dp[currentIndex] = ans;
    console.log(dp);
    return dp[currentIndex];
  };

  return numDecodingsHelper(s, 0);
};

console.log(`Number of Decodins --> ${numDecodings('2326')}`);
console.log(`Number of Decodins --> ${numDecodings('326')}`);
```

## Bottom-up Dynamic Programming

We use a one-dimensional array to store the results of our problems. dp[i] is used to store the number of ways to decode te substring s from 0 to i-1.

dp[i] can get the answer from to other previous indices `i-1` and `i-2`. Two indices are involed since both single and double digit decodes are possible. If a double digit is possible the previous two indices can be added up.

So, our recursive formula will be

```js
if decode is possible:
    dp[i] = dp[i-1] + dp[i-2];
else:
    dp[i] = dp[i-1];
```

**Code:**

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s) return 0;

  const dp = [1];
  dp[1] = s[0] === '0' ? 0 : 1;

  for (let i = 2; i <= s.length; i++) {
    dp[i] = 0;
    // we always add the previous digit as long as the number isn't 0
    if (s[i - 1] !== '0') {
      dp[i] = dp[i - 1];
    }

    // check if two digit decode is posisble
    let twoPrevDigits = parseInt(s.substring(i - 2, i));
    let isTwoDigitsDecodePossible = twoPrevDigits >= 10 && twoPrevDigits <= 26;
    if (isTwoDigitsDecodePossible) dp[i] += dp[i - 2];
  }

  return dp[s.length];
};

console.log(`Number of Decodins --> ${numDecodings('2326')}`);
console.log(`Number of Decodins --> ${numDecodings('326')}`);
console.log(`Number of Decodins --> ${numDecodings('10')}`);
```

### Optimized Solution

At any point in time, we're just looking at the previous two values in the dp array. We can reduce this to O(1) complexity by just storing the last 2 values.

**Code:**

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s) return 0;

  let i1 = 1;
  let i2 = s[0] === '0' ? 0 : 1;

  for (let i = 2; i <= s.length; i++) {
    let temp = 0;
    // we always add the previous digit as long as the number isn't 0
    if (s[i - 1] !== '0') {
      temp = i2;
    }

    // check if two digit decode is posisble
    let twoPrevDigits = parseInt(s.substring(i - 2, i));
    let isTwoDigitsDecodePossible = twoPrevDigits >= 10 && twoPrevDigits <= 26;
    if (isTwoDigitsDecodePossible) temp += i1;

    i1 = i2;
    i2 = temp;
  }

  return i2;
};

console.log(`Number of Decodins --> ${numDecodings('2326')}`);
console.log(`Number of Decodins --> ${numDecodings('326')}`);
console.log(`Number of Decodins --> ${numDecodings('10')}`);
```

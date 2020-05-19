## Problem Statement

Given a string and a pattern, write a method to count the number of times the pattern appears in the string as a subsequence.

Example 1:

```js
Example 1: Input: string: “baxmx”, pattern: “ax”
Output: 2
```

Example 2:

```txt
Input: string: “tomorrow”, pattern: “tor”
Output: 4
```

## Basic Solution

The problem follows the LCS pattern and is quite similar to LRS (Longest Repeating Subsequence); the difference is that we need to count the total occurrences of the subsequence.

A basic brute-force solution could be to try all the subsequences of the given string to count all that match the given pattern. We can match the pattern with the given string one character at a time, so we can do two things at any step:

1. If the pattern has a matching character with the string, we can recursively match for the remaining lengths of the pattern and the string.
2. At every step, we can always skip a character from the string to try to match the remaining string with the pattern. So we can start a recursive call by skipping one character from the string.

Our total count will be the sum of the counts returned by the above two options.

```js
const findSPMCount = (str, pat) => {
  let findSPMCountHelper = (str, pat, strIndex, patIndex) => {
    // if we have reached the end of the pattern
    if (patIndex === pat.length) return 1;

    // if we have reached the end of the string but pattern still has some characters left
    if (strIndex === str.length) return 0;

    let c1 = 0;
    if (str[strIndex] === pat[patIndex]) {
      c1 = findSPMCountHelper(str, pat, strIndex + 1, patIndex + 1);
    }

    const c2 = findSPMCountHelper(str, pat, strIndex + 1, patIndex);

    return c1 + c2;
  };
  return findSPMCountHelper(str, pat, 0, 0);
};

console.log(`Count of pattern in the string: ---> ${findSPMCount('baxmx', 'ax')}`);
console.log(`Count of pattern in the string: ---> ${findSPMCount('tomorrow', 'tor')}`);
```

The time complexity of the above algorithm is exponential O(2^{m}), where ‘m’ is the length of the string, as our recursion stack will not be deeper than m. The space complexity is O(m) which is used to store the recursion stack.

## Top-Down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems.

The two changing values to our recursive function are the two indexes strIndex and patIndex. Therefore, we can store the results of all the subproblems in a two-dimensional array.

**Code:**

```js
const findSPMCount = (str, pat) => {
  const dp = [];
  let findSPMCountHelper = (str, pat, strIndex, patIndex) => {
    // if we have reached the end of the pattern
    if (patIndex === pat.length) return 1;

    // if we have reached the end of the string but pattern still has some characters left
    if (strIndex === str.length) return 0;

    dp[strIndex] = dp[strIndex] || [];
    if (endIndex in dp[strIndex]) return dp[strIndex][patIndex];

    let c1 = 0;
    if (str[strIndex] === pat[patIndex]) {
      c1 = findSPMCountHelper(str, pat, strIndex + 1, patIndex + 1);
    }

    const c2 = findSPMCountHelper(str, pat, strIndex + 1, patIndex);

    dp[strIndex][patIndex] = c1 + c2;
    return dp[strIndex][patIndex];
  };
  return findSPMCountHelper(str, pat, 0, 0);
};

console.log(`Count of pattern in the string: ---> ${findSPMCount('baxmx', 'ax')}`);
console.log(`Count of pattern in the string: ---> ${findSPMCount('tomorrow', 'tor')}`);
```

## Bottom-Up Dynamic Programming

Since we want to match all the subsequences of the given string, we can use a two-dimensional array to store our results. As mentioned above, we will be tracking separate indexes for the string and the pattern, so we will be doing two things for every value of `strIndex` and `patIndex`:

1. If the character at the `strIndex` (in the string) matches the character at `patIndex` (in the pattern), the count of the SPM would be equal to the count of SPM up to `strIndex-1` and `patIndex-1`.
2. At every step, we can always skip a character from the string to try matching the remaining string with the pattern; therefore, we can add the SPM count from the indexes `strIndex-1` and `patIndex`.

So, our recursive formula would be:

```js
if str[strIndex] == pat[patIndex] {
  dp[strIndex][patIndex] = dp[strIndex-1][patIndex-1]
}
dp[i1][i2] += dp[strIndex-1][patIndex]
```

**Code:**

```js
const findSPMCount = (str, pat) => {
  // every empty pattern has one match
  if (pat.length === 0) return 1;

  if (str.length === 0 || pat.length > str.length) return 0;

  // dp[strIndex][patIndex] will be storing the count of SPM up to str[0..strIndex-1][0..patIndex-1]
  const dp = Array(str.length + 1)
    .fill(0)
    .map(() => Array(pat.length + 1).fill(0));

  // for the empty pattern, we have one matching
  for (let i = 0; i <= str.length; i++) dp[i][0] = 1;

  for (let strIndex = 1; strIndex <= str.length; strIndex++) {
    for (let patIndex = 1; patIndex <= pat.length; patIndex++) {
      if (str[strIndex - 1] === pat[patIndex - 1]) {
        dp[strIndex][patIndex] = dp[strIndex - 1][patIndex - 1];
      }
      dp[strIndex][patIndex] += dp[strIndex - 1][patIndex];
    }
  }

  return dp[str.length][pat.length];
};

console.log(`Count of pattern in the string: ---> ${findSPMCount('baxmx', 'ax')}`);
console.log(`Count of pattern in the string: ---> ${findSPMCount('tomorrow', 'tor')}`);
```

The time and space complexity of the above algorithm is `O(m*n)`, where ‘m’ and ‘n’ are the lengths of the string and the pattern respectively.

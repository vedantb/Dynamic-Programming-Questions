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

// console.log(`Number of Decodins --> ${numDecodings('2326')}`);
// console.log(`Number of Decodins --> ${numDecodings('326')}`);
console.log(`Number of Decodins --> ${numDecodings('10')}`);

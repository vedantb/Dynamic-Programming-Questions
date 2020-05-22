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

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

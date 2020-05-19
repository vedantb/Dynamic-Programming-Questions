const findLRSLength = (str) => {
  let findLRSLengthHelper = (str, i1, i2) => {
    if (i1 === str.length || i2 === str.length) return 0;

    if (i1 !== i2 && str[i1] === str[i2]) return 1 + findLRSLengthHelper(str, i1 + 1, i2 + 1);

    const c1 = findLRSLengthHelper(str, i1, i2 + 1);
    const c2 = findLRSLengthHelper(str, i1 + 1, i2);

    return Math.max(c1, c2);
  };
  return findLRSLengthHelper(str, 0, 0);
};

console.log(`Length of Longest Repeating Subsequence: ---> ${findLRSLength('tomorrow')}`);
console.log(`Length of Longest Repeating Subsequence: ---> ${findLRSLength('aabdbcec')}`);
console.log(`Length of Longest Repeating Subsequence: ---> ${findLRSLength('fmff')}`);

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

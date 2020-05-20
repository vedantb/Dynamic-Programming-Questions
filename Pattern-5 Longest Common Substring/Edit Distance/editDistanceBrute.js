const editDistance = (s1, s2) => {
  let editDistanceHelper = (s1, s2, i1, i2) => {
    // if we have reached the end of s1, then we have to insert all the remaining characters of s2
    if (i1 == s1.length) return s2.length - i2;

    // if we have reached the end of s2, then we have to delete all the remaining characters of s1
    if (i2 == s2.length) return s1.length - i1;

    // If the strings have a matching character, we can recursively match for the remaining lengths
    if (s1[i1] === s2[i2]) return editDistanceHelper(s1, s2, i1 + 1, i2 + 1);

    let c1 = 1 + editDistanceHelper(s1, s2, i1 + 1, i2); // perform deletion
    let c2 = 1 + editDistanceHelper(s1, s2, i1, i2 + 1); // perform insertion
    let c3 = 1 + editDistanceHelper(s1, s2, i1 + 1, i2 + 1); // perform replacement

    return Math.min(c1, Math.min(c2, c3));
  };
  return editDistanceHelper(s1, s2, 0, 0);
};

console.log(`Minimum Edit Distance: ---> ${editDistance('bat', 'but')}`);
console.log(`Minimum Edit Distance: ---> ${editDistance('abdca', 'cbda')}`);
console.log(`Minimum Edit Distance: ---> ${editDistance('passpot', 'ppsspqrt')}`);

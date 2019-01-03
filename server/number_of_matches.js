module.exports = {
  numberOfMatches(matches) {
    let matchesPerYear = {};
    matchesPerYear = matches.reduce((matchPerYear, match) => {
      matchPerYear[match.season] = (matchPerYear[match.season] || 0) + 1;
      return matchPerYear;
    }, {});
    return matchesPerYear;
  },
};

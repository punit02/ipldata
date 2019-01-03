module.exports = {
  economicalBowler(matches, matches1) {

  
    const matchesId = matches.reduce((matchId, match) => {
      if (match.season == 2016) {
        matchId.push(match.id);
      }
      return matchId;
    }, []);

    const totalRunsPerPlayer = matches1.reduce((totalRuns, match) => {
      if (matchesId.includes(match.match_id)) {
        totalRuns[match.bowler] = (totalRuns[match.bowler] || 0) + parseInt(match.total_runs);
      }
      return totalRuns;
    }, {});

    

    const ballsPerPlayer = matches1.reduce((ballPerPlayer, match) => {
      if (matchesId.includes(match.match_id)) {
	   ballPerPlayer[match.bowler] = (ballPerPlayer[match.bowler] || 0) + 1;
      }
      return ballPerPlayer;
    }, {});
    for (const i in totalRunsPerPlayer) {
      if (totalRunsPerPlayer[i]) {
        totalRunsPerPlayer[i] = (totalRunsPerPlayer[i] / ballsPerPlayer[i]) * 6;
		 }
    }

    
    function sortProperties(obj) {
      // convert object into array
      const sortable = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) { sortable.push([key, obj[key]]); }
      } // each item is an array in format [key, value]

      // sort items by value
      sortable.sort((a, b) => a[1] - b[1], // compare numbers
      );
      return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    }

    const topEconomyBowler = sortProperties(totalRunsPerPlayer);
    return topEconomyBowler ;
  }
}

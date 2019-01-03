function numberOfWinning() {
    fetch('http://localhost:3000/no-win-matches')
        .then(res => res.json())
        .then(json => stackBarChart(json))
        .catch(error => console.error(error))
}

function stackBarChart(Data) {
    let years = {};
    var noOfmatchesWinPerSeason = Data.reduce((noOfmatchesWinPerSeason, teamAndMatchesWin) => {
        years[teamAndMatchesWin.season] = 0;
        if (teamAndMatchesWin.winner == "" || teamAndMatchesWin == "Rising Pune Supergiants") { }
        else {
            if (!noOfmatchesWinPerSeason[teamAndMatchesWin.winner]) {
                noOfmatchesWinPerSeason[teamAndMatchesWin.winner] = [];
            }
            else {
                noOfmatchesWinPerSeason[teamAndMatchesWin.winner].push(teamAndMatchesWin.wins);
            }
        }
        return noOfmatchesWinPerSeason;
    }, {});
    var teamNames = Object.keys(noOfmatchesWinPerSeason);
    var teamArray = Object.values(noOfmatchesWinPerSeason);
    

    $('#chartcontainer').highcharts({
        chart: {
            type: "bar"
        },
        title: {
            text: "Matches won by all teams over all the years of IPL."
        },
        xAxis: {
            categories: Object.keys(years),
            type: 'category',
            allowDecimals: false,
            title: {
                text: "Years"
            }
        },
        yAxis: {
            title: {
                text: "Total number of matches."
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [
          
            {
                name: teamNames[0],
                data: teamArray[0]
            },
            {
                name: teamNames[1],
                data: teamArray[1]
            },
            {
                name: teamNames[2],
                data: teamArray[2]
            },
            {
                name: teamNames[3],
                data: teamArray[3]
            },
            {
                name: teamNames[4],
                data: teamArray[4]
            },
            {
                name: teamNames[5],
                data: teamArray[5]
            },
            {
                name: teamNames[6],
                data: teamArray[6]
            },
            {
                name: teamNames[7],
                data: teamArray[7]
            },
            {
                name: teamNames[8],
                data: teamArray[8]
            },
            {
                name: teamNames[9],
                data: teamArray[9]
            },
            {
                name: teamNames[10],
                data: teamArray[10]
            },
            {
                name: teamNames[11],
                data: teamArray[11]
            },
            {
                name: teamNames[12],
                data: teamArray[12]
            },
            {
                name: teamNames[13],
                data: teamArray[13]
            },
        

        ]
    });
}

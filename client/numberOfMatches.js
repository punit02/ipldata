function barChartNumberOfMatches(data) {
    var matchesPlayed = data.reduce((matchPlayed,match)=>{
            matchPlayed[match.season]=match.count;
            return matchPlayed;
    },{});
    years = Object.keys(matchesPlayed);
    playedPerSeason = Object.values(matchesPlayed);
    $('#chartcontainer').highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "Matches Played"
        },
        xAxis: {
            categories: years,
            type: 'category',
            allowDecimals: false,
            title: {
                text: ""
            }
        },
        yAxis: {
            title: {
                text: "NO OF MATCHES"
            }
        },
        series: [{
            name: 'YEARS',
            data: playedPerSeason
        }]
    });
}

function numberOfMatches() {
    fetch('http://localhost:3000/no-of-matches')
        .then(res => res.json())
       //.then(json => console.log(json))
        .then(json => barChartNumberOfMatches(json))
        .catch(error => console.error(error))
}
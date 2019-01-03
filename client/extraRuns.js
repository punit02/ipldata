function extraRuns() {
    fetch('http://localhost:3000/extra-runs')
        .then(res => res.json())
        .then(json => barChartExtraRuns(json))
        .catch(error => console.error(error))
}

function barChartExtraRuns(data) {
      
    var extraRunGainedPerTeams= data.reduce((extraRunGainedPerTeams,team)=>{
            extraRunGainedPerTeams[team.batting_team]=team.Extrarun;
            return extraRunGainedPerTeams;
    },{});

    $('#chartcontainer').highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "Record : Extra run conceded by all teams in Year 2016 "
        },
        xAxis: {
            categories: Object.keys(extraRunGainedPerTeams),
            type: 'category',
            allowDecimals: false,
            title: {
                text: "Teams"
            }
        },
        yAxis: {
            title: {
                text: "RUNS"
            }
        },
        series: [{
            name: 'Extra_run_score',
            data: Object.values(extraRunGainedPerTeams)
        }]
    });
}
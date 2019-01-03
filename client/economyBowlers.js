function economicalBowler() {
    fetch('http://localhost:3000/economic-bowler')
        .then(res => res.json())
        //.then(json => console.log(json))
        .then(json => barChartEconomicPlayer(json))
        .catch(error => console.error(error))
}



function barChartEconomicPlayer(data) {
    var economicBowler= data.reduce((economicBowler,bowlerInfo)=>{
        economicBowler[bowlerInfo.bowler]=bowlerInfo.economy;
        return economicBowler;
    },{});
   $('#chartcontainer').highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "Record : Top 10 Economic player in year 2015"
        },
        xAxis: {
            categories:Object.keys(economicBowler),
            type: 'category',
            allowDecimals: false,
            title: {
                text: "Player Name"
            }
        },
        yAxis: {
            title: {
                text: "Economic rate"
            }
        },
        series: [{
            name: 'Economic rate',
            data: Object.values(economicBowler),
        }]
    });
}
  

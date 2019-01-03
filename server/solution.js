var fs=require('fs')
const data=require('./matches.json');
var bodyparser=require('body-parser');
const data1=require('./deliveries.json');

var team={}
var id=[]
var k=0;



for(var i=0;i<data.length;i++)
{
    if(data[i].season==='2016')
    {
        id[k++]=parseInt(data[i].id)
    }
    
}

var len=id.length;
var i=0,count=0;

module.exports={
    extra: function(){
for(var j=1;j<data1.length-1;j++)
{
   if((parseInt(data1[j].match_id))>id[1] && (parseInt(data1[j].match_id))<id[id.length-1])
    {   
        if(data1[j].batting_team===data1[++j].batting_team)
        {
          count=parseInt(data1[j].extra_runs)+count;
        j--;
        }
        else
        {
            team[data1[j].batting_team]=(team[data1[j].batting_team] || 0)+count;
            count=0;
        }
}
}

return team;
    }
}
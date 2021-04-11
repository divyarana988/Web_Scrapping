let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let request = require("request");
let cheerio = require("cheerio");

request(url, cb);

function cb(err, resp, html) {
    if (err) {
        console.log(err);
    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let teamNameArrElem = selectorTool(".Collapsible h5");
    let teamNameArr = [];
    for (let i = 0; i < teamNameArrElem.length; i++){
        let teamName = selectorTool(teamNameArrElem[i]).text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();

        console.log(teamName);
        teamNameArr.push(teamName);
    }

    let batsmanTableArr = selectorTool(".table.batsman");
    for (let i = 0; i < batsmanTableArr.length; i++){
        let singleBatsman = selectorTool(batsmanTableArr[i]).find("tbody tr a");
        for (let j = 0; j < singleBatsman.length; j++){
            let playerName = selectorTool(singleBatsman[j]).text();
            console.log(playerName + " plays for " + teamNameArr[i]);
        }
        console.log("*******************************");
    }
}
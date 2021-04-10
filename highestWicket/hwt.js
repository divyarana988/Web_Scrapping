let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let request = require("request");
let cheerio = require("cheerio");

request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let bowlersTable = selectorTool(".table.bowler");

    let hwtName = "";
    let hwicket = 0;

    for (let i = 0; i < bowlersTable.length; i++) {
        let singleInningBol = selectorTool(bowlersTable[i]).find("tbody tr");

        for (let j = 0; j < singleInningBol.length; j++) {
            let singlecol = selectorTool(singleInningBol[j]).find("td");
            let name = selectorTool(singlecol[0]).text();
            let wicket = selectorTool(singlecol[4]).text();
            console.log("Name -> " + name + " wickets -> " + wicket);
            if (wicket >= hwicket) {
                hwicket = wicket;
                hwtName = name;
            }

        }
        console.log("***********************************")
    }
    console.log(hwtName + "     " + hwicket);
}

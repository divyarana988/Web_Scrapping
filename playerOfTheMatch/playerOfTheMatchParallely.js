let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

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
    let matchesArr = selectorTool(".col-md-8.col-16");

    for (let i = 0; i < matchesArr.length; i++){
        let cardbtns = selectorTool(matchesArr[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let link = selectorTool(cardbtns[2]).attr("href");

        let fullLink = "https://www.espncricinfo.com" + link;
        //console.log(fullLink);
        getPlayer(fullLink);
    }
}

function getPlayer(fullLink) {
    request(fullLink, cb2);
    function cb2(err, resp, html) {
        if (err) {
            console.log(html);
        } else {
            extractPlayer(html);
        }
    }
}

function extractPlayer(html) {
    let selectorTool = cheerio.load(html);
    let playerName = selectorTool(".best-player-name").text();
    let playerTeamName = selectorTool(".best-player-team-name").text();

    console.log(playerName + " from team " + playerTeamName);
}
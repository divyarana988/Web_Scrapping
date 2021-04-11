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
        teamNameArr.push(teamName);
    }

    let batsmanTableArr = selectorTool(".table.batsman");
    for (let i = 0; i < batsmanTableArr.length; i++) {
        let batsmanNameAnchor = selectorTool(batsmanTableArr[i]).find("tbody tr .batsman-cell a");
        
        for (let j = 0; j < batsmanNameAnchor.length; j++) {
            let link = selectorTool(batsmanNameAnchor[j]).attr("href");
            let fullLink = "https://www.espncricinfo.com/" + link;
            let teamName = teamNameArr[i];
            let name = selectorTool(batsmanNameAnchor[j]).text();
            getBirthday(fullLink, name, teamName);
            //console.log(fullLink);
        }
    }
}

function getBirthday(link, name, teamName) {
    request(link, cb2);
    function cb2(err, resp, html) {
        if (err) {
            console.log(err);
        } else {
            extractBirthday(html, name, teamName);
        }
    }
}

function extractBirthday(html, name, teamName){
    let selectorTool = cheerio.load(html);
    let birthdayElem = selectorTool(".player-card-padding h5");
    let birthday = selectorTool(birthdayElem[1]).text();
    console.log(name + " from team " + teamName +  " was born on " + birthday);
}
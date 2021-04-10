let url = "http://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";


let request = require("request");
let cheerio = require("cheerio");


request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    }
    else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let allcomments = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let comment = selectorTool(allcomments[0]).text();
    
    console.log(comment);
}
const puppy = require("puppeteer");
const fs = require('fs');


let browserPromise = puppy.launch({
    headless: false,
    defaultViewport: false,
    args: ["--start-maximized"]
});

const id = "sender's id";
const pass = "password";
const id1 = "receiver's id";
let tab;
browserPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
}).then(function(pages){
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.thehindu.com/todays-paper/");
    return pageOpenPromise;
}).then(function(){
    let waitForPagePromise = tab.waitForSelector("#section_");
    return waitForPagePromise;
}).then(function(){
    let allTagsPromise = tab.$$('ul.archive-list > li > a');
    return allTagsPromise;
}).then(function(data){
    let allTagsArrayPromise = [];
    for(let i of data){
        let arrayPromise = tab.evaluate(function(ele){
            return ele.textContent;
        },i);

        allTagsArrayPromise.push(arrayPromise);
    }
    return Promise.all(allTagsArrayPromise);
}).then(function(data){
    str = "Today's headlines \n";
    data.forEach((headline, idx) => {
        str += (idx +1) + ". " + headline + "\n";
    })
    fs.writeFileSync("headlines.doc", str);
}).then(function(){
    let gmail = tab.goto("https://www.gmail.com");
    return gmail;
}).then(function(){
    let clickOnInputPromise = tab.click(".whsOnd.zHQkBf");
    return clickOnInputPromise;
}).then(function(){
    let idPromise = tab.type(".whsOnd.zHQkBf", id);
    return idPromise;
}).then(function(){
    let clickOnNextPromise = tab.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    return clickOnNextPromise;
}).then(function(){
    let waitForPassPromise = tab.waitForSelector("input[type='password']", {visible: true});
    return waitForPassPromise;
}).then(function(){
    let passPromise = tab.type("input[type='password']",pass);
    return passPromise;
}).then(function(){
    let clickOnOtherNextPromise = tab.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    return clickOnOtherNextPromise;
}).then(function(){
    let waitForNavPromise = tab.waitForSelector(".T-I-KE.T-I.L3", {visible: true});
    return waitForNavPromise;
}).then(function(){
    let clickAnywherePromise = tab.click(".T-I-KE.T-I.L3");
    return clickAnywherePromise;
}).then(function(){
    let clickAnywherePromise1 = tab.click("#:94");
    return clickAnywherePromise1;
}).then(function(){
    let waitForNavPromise2 = tab.waitForSelector("#:9b", {visible: true});
    return waitForNavPromise2;
}).then(function(){
    let id1Promise = tab.type("#:9b", id1);
    return id1Promise;
}).then(function(){
    let TextPromise = tab.type("#:a2", "News headlines from THE HINDU");
    return TextPromise;
}).then(function(){
    let clickOnAttachFiles = tab.click("#:ae");
    return clickOnAttachFiles;
}).catch(function(err){
    console.log("Error occured");
});
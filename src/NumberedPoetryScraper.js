import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';


function NumberedPoetryScraper(url) {
  this.url = url;
  this.$lines = [];
}

NumberedPoetryScraper.prototype.loadContent = async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(this.url, { waitUntil: 'networkidle0' });

  // await for "View Full Text" button and click it
  await page.waitForSelector('.button--primary.text--small');
  await page.click('.button--primary.text--small');

  //give it some time
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await wait(3000);

  const content = await page.content();
  this.$ = cheerio.load(content);
}

NumberedPoetryScraper.prototype.scrape$lines = async function() {
  this.$lines = this.$('span.line').filter((index, element) => {
    // Wrap the element with cheerio
    const $element = this.$(element);

    // Get the line number span inside the line
    const $number = $element.find('.line--number');  

    // Remove non-digit characters
    const lineNumberText = $number.text().replace(/\D/g, ''); 
    // Store line number
    $element.data("number", parseInt(lineNumberText));

    // Remove the number span since it's already stored, dont want it anymore
    $number.remove();

    // If the line contains only whitespace or is empty, filter it out
    return $element.text().trim() !== "";
  });

};


NumberedPoetryScraper.prototype.get$lines = async function get$lines(x,y) {
    if (!x) {throw new Error("No line number provided. If you are trying to pass only one line number pass in first");}
    if (x && (!Number.isInteger(x) || x <= 0)) {throw new Error("Param x must be integer greater than 0");}
    if (y && (!Number.isInteger(y) || y <= 0)) {throw new Error("Param x must be integer greater than 0");}
    if (x === y) {throw new Error ("x and y are the same value. if you want only one line then only pass in the first param");}

    if (x && !y) {return this.get$line(x);}

    const greater = x > y ? x : y;
    const smaller = greater === x ? y : x;


    const filteredLines = this.$lines.filter(element => {
      const nValue = parseInt($(element).attr('n'), 10);
      return nValue >= smaller && nValue <= greater;
    });

    return filteredLines;
}

NumberedPoetryScraper.prototype.get$line = async function get$line(x) { 
  if (!x) {throw new Error("No line number provided");}
  if (x && (!Number.isInteger(x) || x <= 0)) {throw new Error("Line number must be integer greater than 0");}

  const htmlLine = this.$lines.filter(function() {
    return $(this).attr('n') === String(x);
  }).first(); // Get the first match (in case there are multiple matches)

  return htmlLine;
}

export default NumberedPoetryScraper;




















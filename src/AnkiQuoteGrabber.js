import * as IntegerRangeStringParser from './IntegerRangeStringParser.js';
import NumberedPoetryScraper from './NumberedPoetryScraper.js';

import fs from 'fs';


function needToGrabQuote(text) {
  return IntegerRangeStringParser.isOnlyAnIntegerRange(text);
}


// anki thing



async function ankiDo() {

  // scrape all poetry lines
  const scraper = new NumberedPoetryScraper("https://quod.lib.umich.edu/c/cme/AllitMA?rgn=main;view=fulltext");
  await scraper.loadContent();
  await scraper.scrape$lines();

  scraper.$lines.each((index, element) => {
    //console.log(`\n${scraper.$(element).text()}`);
    console.log(`${scraper.$(element).text().trim()} ${scraper.$(element).data("number")}`);
  });


  

scraper.$lines.each((index, element) => {
    const lineText = `${scraper.$(element).text().trim()}`;
    
    // Check if it's not the last element
    const blankLine = index !== scraper.$lines.length - 1 ? '\n' : '';

    // Append to the file (creates it if it doesn't exist)
    fs.appendFileSync('output.txt', lineText + blankLine);
});


// for each anki card
// check quote
// if (needToGrabQuote(note.quote)) {}
// then const numberRange = IntegerRangeStringParser.parseIntegerRange(note.quote)
// const $rangedLines = scraper.get$Lines(...numberRange)
// `${$rangedLines.each(e=> )}` // idk something to get line1.text().trim() \n line2.text().trim() etc until lastLine.text().trim() space IntegerRangeStringParser.generateStringFromNumbers(...numberRange)




return;






}






ankiDo();


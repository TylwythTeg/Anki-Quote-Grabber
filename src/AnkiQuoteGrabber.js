import * as IntegerRangeStringParser from './IntegerRangeStringParser.js';
import NumberedPoetryScraper from './NumberedPoetryScraper.js';


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
    console.log(`${scraper.$(element).text()} ${scraper.$(element).data("number")}`);
  });



// for each anki card
// check quote
// if (needToGrabQuote(note.quote)) {}
// then parse it as either a single line number or linenumber-linenumber
// check lines.length === 1 or === 2
// call scraper.get$Lines(...lines)
// concat strings with quite space, append previous .quote to end











}






ankiDo();


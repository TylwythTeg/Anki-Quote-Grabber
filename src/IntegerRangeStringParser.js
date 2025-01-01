export function parseIntegerRange(input) {
  // Match a single number (like "1871")
  const singleMatch = input.match(/^(\d+)$/);
  
  // Match a range of numbers (like "1781-1783"), tolerates whitespace (like " 1781 - 1783 ")
  const rangeMatch = input.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
  
  // If it's a single number, return it as an array with one element (as a string)
  if (singleMatch) {
    return [singleMatch[1]];
  }

  // If it's a range, return it as an array of the start and end values (as strings)
  if (rangeMatch) {
    const start = rangeMatch[1];
    const end = rangeMatch[2];
    if (parseInt(start, 10) > parseInt(end, 10)) {
      throw new Error(`Invalid range: ${start} cannot be greater than ${end}`);
    }

    return [start, end]; // Keep the range as strings
  }

  // If the input is neither a valid number nor a range, you blew it
  throw new Error("You should have called needToGrabQuote() instead of calling parseIntegerRange on a string that has no valid Integer Range ");
}

export function isOnlyAnIntegerRange(text) {
  // Match either a single integer or a range with digits and a dash in between, 
  // tolerates white space like " 1871-1874 " or "1871 - 1873" 
  // just cant have any other text
  const regex = /^\s*(\d+|\d+\s*-\s*\d+)\s*$/;
  return regex.test(text);  // Returns true if the pattern matches
}

export function generateStringFromNumbers(x,y) {
  if (!x) {throw new Error("No number. If you are trying to pass only one line number pass in first");}
  if (x && (!Number.isInteger(x) || x <= 0)) {throw new Error("Param x must be integer greater than 0");}
  if (y && (!Number.isInteger(y) || y <= 0)) {throw new Error("Param x must be integer greater than 0");}
  if (x === y) {throw new Error ("x and y are the same value. if you want only one line then only pass in the first param");}

  if (x && !y) {return x.toString();}

  const greater = x > y ? x : y;
  const smaller = greater === x ? y : x;

  return `${smaller}-${greater}`;
}
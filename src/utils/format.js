export function thousands (number, separator = ',') {
    // OH MY GOD! a stackoverflow link
    // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

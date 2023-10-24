export const convertStringToWhiteSpace = (endpoind: string, symbol: string) => {
    return endpoind
     .split(symbol)
     .reduce((acc, current) => {
         return acc + current + ' ';
     }, '');
 
 } 

const _ = require('lodash');


const numbers = [1, 2, 3, 4, 5];


const squaredNumbers = _.map(numbers, n => n * n);
console.log("Squared numbers:", squaredNumbers);


const evenNumbers = _.filter(numbers, n => n % 2 === 0);
console.log("Even numbers:", evenNumbers);


const sum = _.reduce(numbers, (acc, n) => acc + n, 0);
console.log("Sum of numbers:", sum);


const sortedNumbers = _.sortBy(numbers, n => -n); 
console.log("Sorted numbers:", sortedNumbers);


const duplicateNumbers = [1, 2, 3, 3, 4, 4, 5, 5]; 
const uniqueNumbers = _.uniq(duplicateNumbers);
console.log("Unique numbers:", uniqueNumbers);

/**
 * calc.js
 * responsible for calculations and input sanitizing
 */

// tribute to our god father, who added Object.keys to ES
'use strict';

/**
 * isNumeric
 * hard things in JavaScript, credits http://bit.ly/2chGF8P
 * 
 * @param n {number | string} e.g: 4 or "4" or 44.44 or -44.44
 * @returns {boolean} 
 */
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

/**
 * sanitizeNumbers
 * Because we can't trust users or QA 
 *
 * @param a, b {number | string} e.g: 4 or "4" or 44.44 or -44.44
 * @returns {array} of two floats like [4, 4.4] or false
 */
const sanitizeNumbers = (a, b) => {
    if (isNumeric(a) && isNumeric(b)) {
        return [parseFloat(a, 10) , parseFloat(b, 10)];
    }
    return false;
};

/**
 * add
 * @param {array} like [2, 4]
 * @returns {number}
 */
const add = (numbers) => numbers[0] + numbers[1];

// exporting all functions, for modularity and testability
exports.isNumeric = isNumeric;
exports.sanitizeNumbers = sanitizeNumbers;
exports.add = add;


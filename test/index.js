/**
 * test/index.js
 * Some tests won't hurt
 * use: npm test 
 * to run these tests
 **/

const should = require('chai').should();

// import calc module and it's functions
const calc = require('../calc.js');
const add = calc.add;
const isNumeric = calc.isNumeric;
const sanitizeNumbers = calc.sanitizeNumbers;

describe('# calc module', () => {
    describe('* isNumeric', () => {
        it('gives true for 4', () => {
            isNumeric(4).should.be.true;		  
        });
        it('gives true for -4', () => {
            isNumeric(-4).should.be.true;		  
        });
        it('gives true for 4.4', () => {
            isNumeric(4.4).should.be.true;		  
        });
        it('gives true for "4"', () => {
            isNumeric("4").should.be.true;		  
        });
        it('gives false for "4WeLoveQA"', () => {
            isNumeric('4weloveQA').should.be.false;		  
        });
    });
    
    describe('* sanitizeNumbers', () => {
        it('gives [4,3] for 4, 3', () => {
            sanitizeNumbers(4,3).should.eql([4,3]);		  
        });
        it('gives false for 4, "3"', () => {
            sanitizeNumbers(4,"3").should.eq[4, 3];		  
        });
        it('gives false for 4, "<script></script>"', () => {
            sanitizeNumbers(4,"<script></script>").should.be.false;		  
        });
    });
    describe('* add', () => {
        it('adds [4, 2] together, gives 6', () => {
            add([4, 2]).should.equal(6);		  
        });
      
        it('gives NaN for [5,]', () => {
            add([4, ]).should.be.NaN;		  
        });
    });
});

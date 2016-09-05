/**
 * server.js
 * Gets an express app up and running,
 * and handles the post request. For calculation and
 * input sanitization uses calc.js module
 */

'use strict';

// import calculations module
const calc = require('./calc.js');

// for bad days
const logger = require('./logger.js');

// it's absolutely not necessary to use Express for such a simple task, but it increases readability
const express = require('express');
const app = express();

// enable cors for all requests
const cors = require('cors');
app.use(cors());

// to pars json in req body
const bodyParser = require('body-parser');
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// to pin out JSON syntax errors in user input, credits: Internet
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        logger.log('error', 'Problems with validity of JSON', {error: err});
        return res.status(404).send('Did you seriously hand me invalid JSON? try again. ' + JSON.stringify(err));
    }
    logger.log('error', 'Express errors, JSON and others', {error: err});
    next();
});

/**
 * handleInput
 * Just to say I have JsDoc plugin installed on my editor
 * @param a {number}
 * @param b {number}
 * @param res {object} express response object
 * @returns {undefined}
 */
const handleInput = (a, b, res) => {
    if(calc.sanitizeNumbers(a,b)) {
        res.json({'result': calc.add(calc.sanitizeNumbers(a, b)) });
    } else {
	const errorMsg = `number1 and number2 must to be numberish.
		          but number1 was: ${a} and number2 was: ${b} `;

        logger.log('error', 'sanitizeNumbers failed', {number1: a, number2: b});
        res.status(404).send(errorMsg);
    }
};

// spin up the server
app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${server.address().port} `);
});

// We're ready, let the clients come in with their numbers!
app.post('/calculator/add', (req, res) => {
    logger.log('info', 'Request arrived in the add endpoint', {requestBody: req.body});
    handleInput(req.body.number1, req.body.number2, res);
});

app.post('*', (req, res) => {
    logger.log('info', 'Someone posted to wrong url');
    return res.status(404).send('Wrong address try posting to /calculator/add');
});
app.get('*', (req, res) => {
    logger.log('info', 'Someone used GET', {request: req.body});
    return res.send(`Hi this is a super REST calculator.
		    Posting a JSON object like {"number1": 3, "number2": 7} to /add returns the sum. Code on github: https://github.com/omidfi/calculator
    `);
});

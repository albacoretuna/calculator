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

const http = require('http');

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
http.createServer(function(request, response) {
		var body = [];
		request.on('data', function(chunk) {
				body.push(chunk);
				}).on('end', function() {
					body = Buffer.concat(body).toString();
					// at this point, `body` has the entire request body stored in it as a string
					});

		request.on('error', function(err) {
				console.error(err);
				response.statusCode = 400;
				response.end();
				});
		response.on('error', function(err) {
				console.error(err);
				});
		if (request.method === 'POST' && request.url === '/sum') {
		request.pipe(response);

		} else {
		response.statusCode = 404;
		response.end();
		}
		}).listen(8080);


/*




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
*/

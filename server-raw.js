/**
* server-raw.js
* here's a simpler server, which is not using express
*/

'use strict';

const http = require('http');

// get request body, do the math and return the result string, body should be json-able
const handleRequest = (body) => {
    let number1, number2, result;
    if(typeof body === 'string' ) {
        // to cacth json.parse errors
        try {
            number1 = JSON.parse(body).number1;
            number2 = JSON.parse(body).number2;
        } catch(e) {
            console.log('body is not parsable', e);
            return '406';
        }
    }
    if (typeof body ==='object') {
        number1 = body.number1;
        number2 = body.number2;
    }
        result = parseFloat(number1) + parseFloat(number2);
        return '{"result":'+ result + '}';
}

// create a raw and dependency less server
http.createServer((request, response)=> {
    // we give back JSON
    response.setHeader('Content-Type', 'application/json');

    // to grab stuff in request body
    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();

        // define the route
        if (request.method === 'POST' && request.url === '/calculator2/sum') {
            const requestResult = handleRequest(body);
            if(requestResult !== '406') {
                response.end(requestResult);
            } else {
                // bad input provided, let client know
                response.statusCode = 406;
                response.end();
            }
        } else {
            response.statusCode = 404;
            response.end();
        }
    });

    // error handling down here
    request.on('error', function(err) {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', function(err) {
        console.error(err);
    });
}).listen(8002);

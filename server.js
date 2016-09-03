// tribute to god father, who showed us the good parts
'use strict';

// it's absolutely not necessary to use Express, but it would be easier to understand for outsiders
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// credits http://bit.ly/2chGF8P
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

// never trust users, (and QA)
const inputIsSane = (a, b) => {
    if (isNumeric(a) && isNumeric(b)) {
        return [a , b];
    }
    return false;
};

/**
 * add
 * @param {array} like [2, 4]
 * @returns {number}
 */
const add = (numbers) => numbers[0] + numbers[1];

/**
 *  handleInput
 * @param a {number}
 * @param b {number}
 * @param res {object} express response object
 * @returns {undefined}
 */
const handleInput = (a, b, res) => {
    if(inputIsSane(a,b)) {
        res.send({'result': add(inputIsSane(a, b)) });
    } else {
        res.status(404).send('Wrong parameters provided');
    }
};

app.use(bodyParser.json());

// to pin out JSON syntax errors exactly...
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(404).send('Bad JSON provided');
    }
    next();
});


// spin up the server
app.set('port', process.env.PORT || 8000);

const server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});

// It all starts here!
app.post('/add', (req, res) => {
    handleInput(req.body.number1, req.body.number2, res);
});

# Calculator
Calculate all the extraordinary problems of mathematics with this rest api. 

## Demo
Here's a codepen demo page using this api: [link](http://codepen.io/omidfi/full/pEvvXK/)
![alt text](https://i.imgur.com/BXHI9nK.png "preview")

## install
```bash
  git clone https://github.com/omidfi/calculator.git
  cd calculator
  npm install
  node server.js
  ```  
## Tests
```bash
npm test
```

## Usage
To add 4 and 53 together: 
```
  curl -H "Content-Type: application/json" -X POST -d '{"number1":4,"number2":53}' http://localhost:8000/add
```

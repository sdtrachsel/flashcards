// This is where your project starts.
const data = require('./src/data');
const prototypeQuestions = data.prototypeData;
const Game = require('./src/Game');

console.log('Your project is running...'); 

const load = new Game (prototypeQuestions)
load.start()


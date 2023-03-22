const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');
const Round = require('../src/Round');
const Game = require('../src/Game');

describe('Game', function () {
    let dataFile;
    beforeEach('data creation', function () {
        dataFile = [
            {
                "id": 26,
                "question": "shift(), unshift(), pop(), and push() are examples of what type of array property method?",
                "answers": ["mutator method", "accessor method", "iteration method"],
                "correctAnswer": "mutator method"
            }, {
                "id": 27,
                "question": "Accessor methods permanently modify the original array, mutator methods do not.",
                "answers": ["true", "false"],
                "correctAnswer": "false"
            }, {
                "id": 28,
                "question": "Which prototype method returns an array of an object's property values?",
                "answers": ["Object.keys()", "Object.values()", "Object.assign()"],
                "correctAnswer": "Object.values()"
            }, {
                "id": 29,
                "question": "map() takes in two optional arguments: the index of the current element, and the array that map was called upon",
                "answers": ["true", "false"],
                "correctAnswer": "true"
            }, {
                "id": 30,
                "question": "What type of methods are functions that allow you to manipulate the value of a particular data type or class?",
                "answers": ["prototype method", "object", "callback function"],
                "correctAnswer": "prototype method"
            }]
    });

    it('should be a function', function () {
        expect(Game).to.be.a('function');
    });



    it('should create game cards', function () {
        const newGame = new Game(dataFile);

        expect(newGame.createCards().length).to.deep.equal(5);
    });

    it('should put cards in a deck', function () {
        const newGame = new Game(dataFile);

        expect(newGame.createDeck().countCards()).to.equal(5);
    });

    it('should create a new round with the deck', function () {
        const newGame = new Game(dataFile);

        expect(newGame.createRound().deck.cards.length).to.equal(5);
        expect(newGame.createRound().returnCurrentCard().id).to.equal(26);
    });

    it('should keep track of the current round', function () {
        const newGame = new Game(dataFile)
        expect(newGame.currentRound).to.equal(0);
    });

    it('should update current round when a round is created', function () {
        const newGame = new Game(dataFile);
        
        newGame.createRound()

        expect(newGame.currentRound).to.be.an.instanceof(Round);
        expect(newGame.currentRound.deck.cards.length).to.equal(5);
        expect(newGame.currentRound.returnCurrentCard().id).to.equal(26);
    });
})
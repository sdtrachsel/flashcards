const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', function () {
    let card;
    let turn;
    beforeEach('data creation',function() {
        card = new Card(2,"What is a comma-separated list of related values?", ["array", "object", "function"], "array");

        turn = new Turn('array', card);
       });

    it.skip('should be a function', function () {
        expect(turn).to.be.a('function');
    });

    it.skip('should be an instance of Turn', function () {
        expect(turn).to.be.an.instanceof(Turn);
    });

    it.skip('should store a users guess to a question', function () {
        expect(turn.guess).to.equal('array');
    });

    it.skip('should store card currently in play', function () {      
        expect(turn.card).to.be.an.instanceof(Card);
        expect(turn.returnCard()).to.deep.equal(card);
    });

    it.skip('should return a users guess', function () {      
        expect(turn.returnGuess()).to.equal(turn.guess);
    });

    it.skip('should return a the card in play', function () {      
        expect(turn.returnCard()).to.deep.equal(turn.card);
    });

    it.skip('should return if a guess was correct or not', function () {
         expect(turn.evaluateGuess()).to.equal(true);

         const turn2 = new Turn('function', card)

         expect(turn2.evaluateGuess()).to.equal(false);
    });

    it.skip('should return feedback', function () {
         expect(turn.giveFeedback()).to.equal('correct!');

         const turn2 = new Turn('function', card)

         expect(turn2.evaluateGuess()).to.equal('incorrect!');
    });
});
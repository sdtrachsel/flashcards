const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');
const Round = require('../src/Round');

describe('Round', function () {
    let card1;
    let card2;
    let card3;
    let deck;
    let round;

    beforeEach('data creation', function () {
        card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');

        card2 = new Card(2, 'What is a comma-separated list of related values?',
            ['array', 'object', 'function'], 'array');

        card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');

        deck = new Deck([card1, card2, card3]);
        round = new Round(deck);
    });

    it('should be a function', function () {
        expect(Round).to.be.a('function');
    });

    it('should be an instance of Round', function () {
        expect(round).to.be.an.instanceof(Round);
    });

    it('should store a deck of cards', function () {
        expect(round.deck.cards.length).to.equal(3);
        expect(round.deck.cards[0].id).to.equal(1);
        expect(round.deck.cards[1].id).to.equal(2);
        expect(round.deck.cards[2].id).to.equal(3);
    })

    it('should store the current card being played', function () {
        expect(round.currentCard).to.be.an.instanceof(Card);
    });

    it('should have the current card as the first card in the deck when starting a game', function () {
        expect(round.currentCard.id).to.equal(1);
    });

    it('should keep track of the number of turns', function () {
        expect(round.turns).to.equal(0);
    });

    it('should store the incorrect guesses', function () {
        expect(round.incorrectGuesses).to.deep.equal([]);
    });

    it('should return the current card', function () {
        expect(round.returnCurrentCard()).to.deep.equal(round.currentCard);
    })

    it('should take a turn to update the turn count', function () {
        round.takeTurn('guess');

        expect(round.turns).to.equal(1);

        round.takeTurn('guess');

        expect(round.turns).to.equal(2);
    });

    it('should be able to find and set the start time', function() {
        let time = Date.now()
        
        expect(round.startTime).to.equal(undefined)
        
        round.setStartTime()
        
        expect(round.startTime).to.be.closeTo(time, 499);
    });
   
    it('should find and set end time', function() {
        let time = Date.now()

        expect(round.startTime).to.equal(undefined)

        round.setEndTime()

        expect(round.endTime).to.be.closeTo(time, 499);
    });

    it('should return time taken to complete in minutes and seconds', function() {
        round.startTime = 1679581267781
        round.endTime = 1679581300824
        round.calculateTime()
        
        expect(round.calculateTime()).to.equal('1 minute(s) and 33 seconds');
    });

    it('should update current card to next card', function () {
        round.takeTurn('guess')

        expect(round.currentCard.id).to.equal(2);

        round.takeTurn('guess')

        expect(round.currentCard.id).to.equal(3);
    });

    it('should let the user know if the answer is correct', function () {
        expect(round.takeTurn('guess')).to.equal('incorrect!');

        expect(round.takeTurn('array')).to.equal('correct!');
    });

    it('should add the card id of incorrect guesses to incorrect guesses list', function () {
        round.takeTurn('guess');

        expect(round.incorrectGuesses).to.deep.equal([1]);

        round.takeTurn('guess');

        expect(round.incorrectGuesses).to.deep.equal([1, 2]);
    });

    it('should calculate the percentage of correct guesses', function () {
        round.takeTurn('guess');

        expect(round.incorrectGuesses).to.deep.equal([1]);

        round.takeTurn('array');
        round.takeTurn('mutator method');

        expect(round.incorrectGuesses).to.deep.equal([1]);

        expect(round.calculatePercentCorrect()).to.equal(67);
    });

    it('should print game information when round has ended', function () {
        round.takeTurn('guess');
        round.takeTurn('array');
        round.takeTurn('mutator method');

        expect(round.endRound()).to.equal('** Round over! ** You answered 67% of the questions correctly!');
    });
});
const Turn = require('../src/Turn');

class Round {
    constructor(deck) {
        this.deck = deck;
        this.cardPosition = 0;
        this.currentCard = deck.cards[this.cardPosition];
        this.turns = 0;
        this.incorrectGuesses = [];
    }

    reurnCurrentCard() {
        return this.currentCard;
    }

    takeTurn(guess) {
        this.turns++;
        let result = new Turn(guess, this.currentCard);

        if (!result.evaluateGuess()) {
            this.incorrectGuesses.push(this.currentCard.id);
        }

        this.cardPosition++;
        this.currentCard = this.deck.cards[this.cardPosition];
        return result.giveFeedback();
    }

    calculatePercentCorrect() {
        const correctGuessCount = this.deck.cards.length - this.incorrectGuesses.length;
        const percentCorrect = Math.round((correctGuessCount / this.deck.cards.length) * 100);

        return percentCorrect;
    }

    endRound(){
        return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
    }
};

module.exports = Round;
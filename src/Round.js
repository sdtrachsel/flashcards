const Turn = require('../src/Turn');

class Round {
    constructor(deck) {
        this.deck = deck;
        this.cardPosition = 0;
        this.currentCard = deck.cards[this.cardPosition];
        this.turns = 0;
        this.incorrectGuesses = [];
        this.startTime;
        this.endTime;
    }

    returnCurrentCard() {
        return this.currentCard;
    }

    setStartTime() {
        this.startTime = Date.now();
    }

    setEndTime() {
        this.endTime = Date.now()
    }

    calculateTime() {
        let totalTime = this.endTime - this.startTime 

        let totalSeconds = totalTime / 1000
        let minutes = Math.round(totalSeconds / 60)
        let seconds = Math.round(totalSeconds % 60)

        return `${minutes} minute(s) and ${seconds} seconds`
    }

    takeTurn(guess) {
        this.turns++;
        let result = new Turn(guess, this.currentCard);

        if (!result.evaluateGuess()) {
            this.incorrectGuesses.push(this.currentCard.id);
        }

        this.cardPosition++;
        this.currentCard = this.deck.cards[this.cardPosition];

        if(!this.currentCard){
            this.setEndTime()
        }

        return result.giveFeedback();
    }

    calculatePercentCorrect() {
        const correctGuessCount = this.deck.cards.length - this.incorrectGuesses.length;
        const percentCorrect = Math.round((correctGuessCount / this.deck.cards.length) * 100);

        return percentCorrect;
    }

    endRound(){
        console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly! \n You completed all the questions in ${this.calculateTime()}`);
        
        return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`
    }
};

module.exports = Round;
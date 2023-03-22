const data = require('../src/data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

class Game {
  constructor(questionFile) {
    this.currentRound = 0;
    this.questionFile = questionFile
  }

  createCards(){
     const cards = this.questionFile.map((question) => {
      return new Card (question.id, question.question, question.answers, question.correctAnswer)
    })

    return cards
  }

  createDeck(){
    const cards = this.createCards()
    const deck = new Deck (cards)
    
    return deck
  }

  createRound(){
    const deck = this.createDeck()
    const round = new Round(deck)
    this.currentRound = round

    return round
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }

  start(){
    this.createCards()
    const deck = this.createDeck()
    this.createRound()
    this.printMessage(deck, this.currentRound)
    this.printQuestion(this.currentRound)
  }
}

module.exports = Game;
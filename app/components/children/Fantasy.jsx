import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import HeaderFantasy from './grandchildren/HeaderFantasy.jsx';
import GuessArea from './grandchildren/GuessArea.jsx';
import Streak from './grandchildren/Streak.jsx';
import Guesses from './grandchildren/Guesses.jsx';
import LetterBank from './grandchildren/LetterBank.jsx';
import helpers from '../utils/helpers';
import Copyright from './Copyright.jsx';
import TopScores from './grandchildren/TopScores.jsx';

class Fantasy extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    // NOTE: change the theme in the parameter for future themes
    this.props.setWordBank('fantasy', this.props.setWord);
  }

  render() {
    // NOTE: use conditionals for the theme to determine the id's/ css styling attributes.
    return (
      <div>
        <HeaderFantasy />
        <section className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <GuessArea
                letters = {this.props.letters}
                theme = {this.props.theme}
                lettersClickCount = {this.props.lettersClickCount}
                wordToGuess = {this.props.wordToGuess}
                wrongLetters = {this.props.wrongLetters}
                guessesLeft = {this.props.guessesLeft}
                setWord = {this.props.setWord}
                setWordBank = {this.props.setWordBank}
                setLetter = {this.props.setLetter}
                setWrongLetter = {this.props.setWrongLetter}
                setLettersClickCount = {this.props.setLettersClickCount}
                setGuessesLeft = {this.props.setGuessesLeft}
                addWinStreak = {this.props.addWinStreak}
                gameOver = {this.props.gameOver}
                startGame = {this.props.startGame}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-center">
              <Streak
                winStreak = {this.props.winStreak}
                theme = {this.props.theme}
              />
            </div>
            <div className="col-md-4 text-center">
              <LetterBank
                letters = {this.props.letters}
                theme = {this.props.theme}
                wrongLetters = {this.props.wrongLetters}
              />
            </div>
            <div className="col-md-4 text-center">
              <Guesses
                guessesLeft = {this.props.guessesLeft}
                theme = {this.props.theme}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <TopScores
                theme = {this.props.theme}
              />
            </div>
          </div>
        </section>
        <Copyright />
      </div>
    )
  }
}

export default Fantasy;

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import helpers from '../../utils/helpers.js';

class GuessArea extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      display: '',
      wordCheck: ''
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentDidUpdate() {

    // TODO: Bug where display doesn't reset on Game over.

    if (this.props.wordToGuess !== this.state.wordCheck) {
      let hiddenLetters = this.props.wordToGuess;
      this.setState({ wordCheck: this.props.wordToGuess }, () => {
        let tempHidden = '';
        for (let i = 0; i < hiddenLetters.length; i++) {
          if (hiddenLetters[i] !== ' ') {
            tempHidden += '_';
          }
          else tempHidden += ' ';
        }
        this.setState({ display: tempHidden });
      });
    };
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  // NOTE: event 'e' parameter is default, because it's handleKeyPress function
  // is being used as a callback to an event listener. the event is returned to the callback function
  handleKeyPress(e) {
    let partialWord = this.state.display.toUpperCase();
    let currentKey = e.key.toUpperCase();
    this.props.setLettersClickCount(e.key.toLowerCase());

    for (let i = 0; i < partialWord.length; i++) {
      if (currentKey !== this.state.wordCheck[i].toUpperCase() && !this.props.wrongLetters[e.key.toLowerCase()] && !this.props.letters[e.key.toLowerCase()]) {
        this.props.setWrongLetter(e.key.toLowerCase());
      }
      else if (currentKey === this.state.wordCheck[i].toUpperCase()) {
        this.props.setLetter(e.key.toLowerCase());
        this.props.setWrongLetter(e.key.toLowerCase());
        partialWord = partialWord.substr(0, i) + currentKey + partialWord.substr(i + 1);
      }
    }

    if (this.props.lettersClickCount[e.key.toLowerCase()] === 1 && this.props.wrongLetters[e.key.toLowerCase()]) {
      this.props.setGuessesLeft(this.props.guessesLeft - 1);
      if (this.props.guessesLeft === 0) {
        this.props.gameOver();

      }
    }

    this.setState({display: partialWord});
    if (this.state.display.toUpperCase() === this.state.wordCheck.toUpperCase()) {
      this.props.addWinStreak();
      this.props.setWord();
    }
  }

  render() {
    let selectedTheme;

    if (this.props.theme['videogames']) {
      selectedTheme = 'vg-panel-hdr';
    }
    else if (this.props.theme['scifi']) {
      selectedTheme = 'scifi-panel-hdr';
    }
    else if (this.props.theme['fantasy']) {
      selectedTheme = 'fantasy-panel-hdr';
    }

    return (
      <div>
        <div className="panel panel-default">
          <div className={`panel-heading ${selectedTheme}`}>
            <h3 className="panel-title ">Hidden Word</h3>
          </div>
          <div className="panel-body guess-area">
            {this.state.display}
          </div>
        </div>
      </div>
  )}
}

export default GuessArea;

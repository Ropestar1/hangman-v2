import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import helpers from './utils/helpers';
import Themes from './children/Themes.jsx';
import Videogames from './children/Videogames.jsx';
import SciFi from './children/SciFi.jsx';
import Fantasy from './children/Fantasy.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: {},
      letters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false
      },
      wordToGuess: '',
      wordBank: {},
      wrongLetters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false
      },
      lettersClickCount: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        m: 0,
        n: 0,
        o: 0,
        p: 0,
        q: 0,
        r: 0,
        s: 0,
        t: 0,
        u: 0,
        v: 0,
        w: 0,
        x: 0,
        y: 0,
        z: 0
      },
      guessesLeft: 6,
      winStreak: 0
    }

    this.setLetter = this.setLetter.bind(this);
    this.setWrongLetter = this.setWrongLetter.bind(this);
    this.setLettersClickCount = this.setLettersClickCount.bind(this);
    this.setWordBank = this.setWordBank.bind(this);
    this.setWord = this.setWord.bind(this);
    this.setGuessesLeft = this.setGuessesLeft.bind(this);
    this.addWinStreak = this.addWinStreak.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  // React Lifecycle functions
  componentDidMount() {
    console.log('%cThanks for playing! I hope you enjoy!', 'color: red; font-style: bold; font-size: 24px; background-color: black');
    console.log('%cPlease feel free to contact me at ropermacaraeg@gmail.com if you need help with any full stack, frontend, or backend projects. I\'d be more than happy to chat to see if my skill set could help you in your goals.', 'color: red; font-style: bold; font-size: 12px; background-color: black');
  }

  // Custom functions
  setLetter(guessedLetter) {
    const lettersCopy = this.state.letters;
    lettersCopy[guessedLetter] = true;
    // NOTE: you can use variables as keys if you use bracket notation
    this.setState({ letters: lettersCopy });
  }

  setWrongLetter(wrongGuess) {
    const wrongLettersCopy = this.state.wrongLetters;
    if (!wrongLettersCopy[wrongGuess] && !this.state.letters[wrongGuess]) {
      wrongLettersCopy[wrongGuess] = true;
    }
    else if (this.state.letters[wrongGuess]) {
      wrongLettersCopy[wrongGuess] = false;
    }
    // NOTE: you can use variables as keys if you use bracket notation
    this.setState({ wrongLetters: wrongLettersCopy });
  }

  setWordBank(theme, cbToSetWord) {
    // NOTE: use only on initial call to database for selected themes.
    this.startGame();
    if (theme === 'videogames') {
      helpers.retrieveVideogame().then(res => {
        this.setState({ themes: {[res.data.theme] : true} });
        // NOTE: Look into possibly making data for themeBank an object from the get go vs. an array (more efficient data)
        const receivedWordBank = res.data.themeBank;
        const objWordBank = {};
        for (let i = 0; i < receivedWordBank.length; i++) {
          objWordBank[receivedWordBank[i]] = 0;
          // NOTE: possibly add a portion that tracks how many times people guessed this word correctly.
        };
        this.setState({ wordBank: objWordBank });
        cbToSetWord();
      })
    }
    else if (theme === 'scifi') {
      helpers.retrieveSciFi().then(res => {
        this.setState({ themes: {[res.data.theme] : true} });
        // NOTE: Look into possibly making data for themeBank an object from the get go vs. an array (more efficient data)
        const receivedWordBank = res.data.themeBank;
        const objWordBank = {};
        for (let i = 0; i < receivedWordBank.length; i++) {
          objWordBank[receivedWordBank[i]] = 0;
          // NOTE: possibly add a portion that tracks how many times people guessed this word correctly.
        };
        this.setState({ wordBank: objWordBank });
        cbToSetWord();
      })
    }
    else if (theme === 'fantasy') {
      helpers.retrieveFantasy().then(res => {
        this.setState({ themes: {[res.data.theme] : true} });
        // NOTE: Look into possibly making data for themeBank an object from the get go vs. an array (more efficient data)
        const receivedWordBank = res.data.themeBank;
        const objWordBank = {};
        for (let i = 0; i < receivedWordBank.length; i++) {
          objWordBank[receivedWordBank[i]] = 0;
          // NOTE: possibly add a portion that tracks how many times people guessed this word correctly.
        };
        this.setState({ wordBank: objWordBank });
        cbToSetWord();
      })
    }
  }

  setWord() {
    const updatedWordBank = this.state.wordBank;
    // NOTE: below portion of code used to reduce the wordBank so no duplicates occur for user.

    // TODO: add logic/conditional to trigger reset if all words are used up. If empty {}, then use helpers for new theme or themebank.

    const keys = Object.keys(updatedWordBank);
    const starterWord = keys[Math.floor(Math.random() * keys.length)];
    this.setState({ wordToGuess: starterWord })
    delete updatedWordBank[starterWord];
    this.setState({ wordBank: updatedWordBank });
  }

  setGuessesLeft(guessesLeftReceived) {
    this.setState({ guessesLeft: guessesLeftReceived })
  }

  setLettersClickCount(letterPressed) {
    const lettersClickCountCopy = this.state.lettersClickCount;
    lettersClickCountCopy[letterPressed]++;
    this.setState({ lettersClickCount: lettersClickCountCopy})
  }

  addWinStreak() {
    let updatedWins = this.state.winStreak;
    updatedWins++;
    this.setState({
      letters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false
      },
      wrongLetters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false
      },
      lettersClickCount: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        m: 0,
        n: 0,
        o: 0,
        p: 0,
        q: 0,
        r: 0,
        s: 0,
        t: 0,
        u: 0,
        v: 0,
        w: 0,
        x: 0,
        y: 0,
        z: 0
      },
      guessesLeft: 6,
      winStreak: updatedWins
    });
  }

  startGame() {
    this.setState({
      themes: {},
      letters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false
      },
      wordToGuess: '',
      wordBank: {},
      wrongLetters: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false
      },
      lettersClickCount: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        m: 0,
        n: 0,
        o: 0,
        p: 0,
        q: 0,
        r: 0,
        s: 0,
        t: 0,
        u: 0,
        v: 0,
        w: 0,
        x: 0,
        y: 0,
        z: 0
      },
      guessesLeft: 6,
      winStreak: 0
    })
  }

  gameOver() {
    // TODO: display game over page, and relink to the theme page
    console.log('GAME OVER');
    if (this.state.themes['videogames']) {
      this.setWordBank('videogames', this.setWord);
    }
    else if (this.state.themes['scifi']) {
      this.setWordBank('scifi', this.setWord);
    }
    else if (this.state.themes['fantasy']) {
      this.setWordBank('fantasy', this.setWord);
    }
  }

  render() {
    return(
      <div>
        <img className="background-image"></img>
        <main>
          <Switch>
            <Route exact path="/" component={Themes} />
            <Route path="/videogames" render={() => (
              <Videogames
                letters = {this.state.letters}
                theme = {this.state.themes}
                lettersClickCount = {this.state.lettersClickCount}
                wordToGuess = {this.state.wordToGuess}
                wrongLetters = {this.state.wrongLetters}
                winStreak = {this.state.winStreak}
                guessesLeft = {this.state.guessesLeft}
                setLetter = {this.setLetter}
                setWrongLetter = {this.setWrongLetter}
                setLettersClickCount = {this.setLettersClickCount}
                setWordBank = {this.setWordBank}
                setWord = {this.setWord}
                setGuessesLeft = {this.setGuessesLeft}
                addWinStreak = {this.addWinStreak}
                gameOver = {this.gameOver}
                startGame = {this.startGame}
              />
            )} />
            <Route path="/scifi" render={() => (
              <SciFi
                letters = {this.state.letters}
                theme = {this.state.themes}
                lettersClickCount = {this.state.lettersClickCount}
                wordToGuess = {this.state.wordToGuess}
                wrongLetters = {this.state.wrongLetters}
                winStreak = {this.state.winStreak}
                guessesLeft = {this.state.guessesLeft}
                setLetter = {this.setLetter}
                setWrongLetter = {this.setWrongLetter}
                setLettersClickCount = {this.setLettersClickCount}
                setWordBank = {this.setWordBank}
                setWord = {this.setWord}
                setGuessesLeft = {this.setGuessesLeft}
                addWinStreak = {this.addWinStreak}
                gameOver = {this.gameOver}
                startGame = {this.startGame}
              />
            )} />
          <Route path="/fantasy" render={() => (
              <Fantasy
                letters = {this.state.letters}
                theme = {this.state.themes}
                lettersClickCount = {this.state.lettersClickCount}
                wordToGuess = {this.state.wordToGuess}
                wrongLetters = {this.state.wrongLetters}
                winStreak = {this.state.winStreak}
                guessesLeft = {this.state.guessesLeft}
                setLetter = {this.setLetter}
                setWrongLetter = {this.setWrongLetter}
                setLettersClickCount = {this.setLettersClickCount}
                setWordBank = {this.setWordBank}
                setWord = {this.setWord}
                setGuessesLeft = {this.setGuessesLeft}
                addWinStreak = {this.addWinStreak}
                gameOver = {this.gameOver}
                startGame = {this.startGame}
              />
            )} />
          </Switch>
        </main>
      </div>
    )};
}

export default Main;

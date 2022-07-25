import { useState, useEffect } from 'react'

import './App.css'
import DisplayPuzzle from './components/DisplayPuzzle'
import UserGuess from './components/UserGuess.jsx'
import DisplayGuesses from './components/DisplayGuesses'

import axios from 'axios'

function App() {


  const [puzzle, setPuzzle] = useState('')
  const [lettersGuessed, setLettersGuessed] = useState([])


  // way 1: .get .then .catch 
  //if response is a success, everything inside .then will get executed. If there is any error, everything inside .catch will get executed.

  // const getPuzzle = () => {
  //   axios.get("https://random-word-api.herokuapp.com/word").then((response) => {
  //   console.log(response)
  //   console.log(response.data[0])
  //   setPuzzle(response.data[0]) //update state of puzzle
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  //way 2: await async
  //YOU HAVE TO INCLUDE async to use await. Await just wait for the promise to resolve before moving on. Any time you can write a .then (in way 1), you can use await. 

  const getPuzzle = async () => {
    try {
      const response = await axios.get("https://random-word-api.herokuapp.com/word")
      setPuzzle(response.data[0])
      setLettersGuessed([])
    }
    catch (error)  {
      console.log(error)
    }
  }

  //automatically call getPuzzle() when the components did mount (one time when the page just rendered)
  useEffect( () => {
    console.log('Starting the game!')
    getPuzzle()
    
  }, [])

  //constant to filter out the wrong guesses, use to check how many times the user guessed wrongly and in the DisplayGuesses (display wrong guesses) component
  const wrongGuesses = lettersGuessed.filter((guess) =>{ 
    return !puzzle.includes(guess)
  })


  //handles onSubmit event in UserGuess component
  const submitGuess = (event) => {
    event.preventDefault() //don't want the page to refresh

    if (wrongGuesses.length >=6) {
      alert(`You have lost the game! The word was ${puzzle}.`)
      return  //end the function
    }

    const userGuess = document.getElementById('user-guess').value.toLowerCase() //in case the user input a capitalize letter

    if (userGuess === '') {
      alert('Please input a guess!')
      return //end the function
    } else if (lettersGuessed.includes(userGuess)) {
      alert('You have already guessed this letter!')
      return //end the function
    }
    const letters = [...lettersGuessed, userGuess]
    // lettersGuessed.push(userGuessed) don't do that because you are directly altering the state
    setLettersGuessed(letters)
    document.getElementById('user-guess').value = ''

  }

  //return true if lettersGuessed include all of the letters in puzzle
  const checkVictory = () => {
    for (let letter of puzzle) {
      if (!lettersGuessed.includes(letter)) {
        return false
      }
    }

    return true
  }

  
  return (
    <div className="App">
      {
        (checkVictory() && puzzle != '') ? 
        // display this part if checkVictory() and puzzle != "" are true
        <div> 
           <h1>Gratz! You won! The word was {puzzle}. </h1>
           <button onClick={() => window.location.reload()}> Click to restart the game!</button>
         </div>

         :
         // display this part if either checkVictory() and puzzle != "" are false
         <div>
            {puzzle}
            <h1> Hangman App</h1>
             <hr></hr>
           <DisplayPuzzle puzzle = {puzzle} lettersGuessed = {lettersGuessed}/>
          <UserGuess submitGuess={submitGuess}/>
          <DisplayGuesses wrongGuesses = {wrongGuesses}/>
          </div>
      }

    </div>
  )
}

export default App

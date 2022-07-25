


function DisplayGuesses (props) {

    const {wrongGuesses} = props //this prop is a list of letters that are not in puzzle

    return (
        <div>
            { wrongGuesses.length != 0 &&
            <div>
            <h2> Wrong Guesses: </h2>
            {
                //mapping each element in wrongGuesses to have <h3> </h3> tag
            wrongGuesses.map((letter, index) => {
                return <h3 key = {index}> {index+1} : {letter} </h3>
            })
            }
            </div> }
        </div>
    )
}

export default DisplayGuesses



function DisplayPuzzle (props) {

    //can call function instead of mapping the list right inside return if wanted

    //since props.puzzle is a string, must split to get an array to use map

    // const handleDisplay = () => {   
    //     return props.puzzle.split('').map((letter) => { 
    //         if (props.lettersGuessed.includes(letter)) {
    //             return letter
    //         } else {
    //             return ' _ '
    //         }
    //     })
    // }

    return (
        <div>
            <h1> 
            { 
            props.puzzle.split('').map((letter) => { 
                if (props.lettersGuessed.includes(letter)) {
                    return letter
                } else {
                    return ' _ '
                }
            })
            }
            </h1>
        </div>
    )
}


export default DisplayPuzzle
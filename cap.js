// function to capitalize first letter of each word.
const CapitalizeFirstLetter = ( word ) => {
    let separateWords = word.split(' ')

    for ( element in separateWords ) {
        separateWords[ element ] = separateWords[ element ].charAt(0).toUpperCase() + separateWords[ element ].substring(1).toLowerCase()
    }

    return separateWords.join(' ')

}


// console.log(CapitalizeFirstLetter('node cRAp'))




// function to capitalize all letters.
const CapitalizeAllLetters = ( word ) => {
    return word.toUpperCase()

}

console.log( CapitalizeAllLetters('good morning 14 - 32 - 1999') )




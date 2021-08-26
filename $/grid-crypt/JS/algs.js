// TEXT --> GRID
const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q' ,'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function DoubleRow(){

    let word = Id('word').value

    if (word.length > 0){
        setGrid(word.length*2, 13)
        Clear()
    }

    for (let i=0; i<word.length; i++){

        let letter = word[i].toUpperCase()
        let order = ABC.indexOf(letter)

            if (order != -1){
            if (order < grid[0].length){
                grid[i*2][order] = 1
            }else{
                grid[i*2+1][order-grid[0].length] = 1
            }
        }
    }
}

function SixCol(){

    let word = Id('word').value

    if (word.length > 0){
        setGrid(5, word.length*6)
        Clear()
    }

    for (let i=0; i<word.length; i++){

        let letter = word[i].toUpperCase()
        let order = ABC.indexOf(letter)

        if (order != -1){
            grid[order % grid.length][i*5+Math.floor(order/5)] = 1
        }
    }
}

// GRID --> NUMBER

function Count(){

    let result = 0

    for (let i=0; i<grid.length; i++){
        for (let j=0; j<grid[0].length; j++){
            let cell = grid[i][j]

            if (cell == 1){
                result++
            }
        }
    }

    return result
}

function Abacus(){

    let result = 0

    for (let i=0; i<grid.length; i++){

        for (let j=0; j<grid[i].length; j++){
            let cell = grid[i][j]

            if (cell == 1){

                if (i == 0){
                    result += 10**j*5
                }else{
                    result += 10**j
                }
            }
        }
    }

    return result
}

function DifferenceRow(){

    let result = 0
    let sums = []

    for (let i=0; i<grid.length; i++){

        let rowSum = 0

        for (let j=0; j<grid[i].length; j++){
            let cell = grid[i][j]

            if (cell == 1){
                rowSum++
            }
        }

        sums.push(rowSum)
    }

    for (let i=1; i<sums.length; i++){

        let difference = Math.abs(sums[i] - sums[i-1])
        result += difference
    }

    return result
}


function DistanceOrigin(){

    let result = 0

    for (let i=0; i<grid.length; i++){
        for (let j=0; j<grid[0].length; j++){
            let cell = grid[i][j]

            if (cell == 1){
                result += i+j
            }
        }
    }

    return result
}
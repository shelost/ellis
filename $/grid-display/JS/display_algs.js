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
                    result += 10**(grid[0].length-j-1)*5
                }else{
                    result += 10**(grid[0].length-j-1)
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
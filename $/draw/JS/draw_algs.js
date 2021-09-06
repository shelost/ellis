// Helper functions

function randomCoords(){

    let x = Math.floor(Math.random()*Rows)
    let y = Math.floor(Math.random()*Cols)

    return [x,y]
}

function setProblem(key){

    for (let a=0; a<key.length; a++){
        let coords = key[a]
        let i = coords.i
        let j = coords.j
        let n = coords.n

        grid[i][j] = n
    }
}

// Problems

function connectOrder(n){

    let key = []

    while (key.length < n){

        let coords = randomCoords()

        if (key.length > 1){

            let duplicate = false
            for (let i=0; i<key.length; i++){
                let k = key[i]
                if (coords[0] == k.i || coords[1] == k.j){
                    duplicate = true
                }
            }
            if (!duplicate){
                key.push({i: coords[0], j: coords[1], n: key.length+1})
            }

        }else{
            key.push({i: coords[0], j: coords[1], n: key.length+1})
        }
    }

    return key
}

function territory(n){
    let key = []

    while (key.length < n*2){

        let coords = randomCoords()

        let num = Math.floor(key.length/n)+1

        if (key.length > 1){

            // Check for duplicates
            let duplicate = false
            for (let i=0; i<key.length; i++){
                let k = key[i]
                if (coords[0] == k[0] || coords[1] == k[1]){
                    duplicate = true
                }
            }

            // Check for touching cells
            let touch = false
            for (let i=0; i<key.length; i++){
                let k = key[i]
                if (Math.abs(coords[0]-k.i) == 1 || Math.abs(coords[1]-k.j) == 1){
                    touch = true
                }
            }


            if (!duplicate && !touch){
                key.push({i: coords[0], j: coords[1], n: num})
            }

        }else{
            key.push({i: coords[0], j: coords[1], n: num})
        }
    }

    return key
}



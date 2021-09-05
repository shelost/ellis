function randomCoords(){

    let x = Math.floor(Math.random()*Rows)
    let y = Math.floor(Math.random()*Cols)

    return [x,y]
}

function connectOrder_key(n){

    let key = []

    while (key.length < n+1){

        let coords = randomCoords()

        if (key.length > 1){

            let duplicate = false
            for (let i=0; i<key.length; i++){
                if (coords[0] == key[i][0] || coords[1] == key[i][1]){
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


function setProblem(key){

    for (let a=0; a<key.length; a++){
        let coords = key[a]
        let i = coords.i
        let j = coords.j
        let n = coords.n

        grid[i][j] = n
    }
}





let SELECT = Id('algs')
let TEXT = Id('text')

Cols = 10
Rows = 5

/// INTERACTION

Id('clear').onclick = Clear
Id('random').onclick = Random
Id('dim-x-down').onclick = () => {
    if (Cols > 2){
        Cols --
    }
    setGrid(Rows, Cols)
}
Id('dim-x-up').onclick = () => {
    if (Cols < 15){
        Cols ++
    }
    setGrid(Rows, Cols)
}
Id('dim-y-down').onclick = () => {
    if (Rows > 2){
        Rows --
    }
    setGrid(Rows, Cols)
}
Id('dim-y-up').onclick = () => {
    if (Rows < 15){
        Rows ++
    }
    setGrid(Rows, Cols)
}

function Hover(i,j){

    if (
        effX > canvas.width/2+(j-grid[0].length/2)*gridSize &&
        effX < canvas.width/2+(j+1-grid[0].length/2)*gridSize &&
        effY > canvas.height/2+(i-grid.length/2)*gridSize &&
        effY < canvas.height/2+(i+1-grid.length/2)*gridSize
        ){

        return true

    }else{

        return false

    }
}

function toggleCell(e){

    MX = e.clientX
    MY = e.clientY
    effX = MX - rect.left
    effY = MY - rect.top

    for (let i=0; i<grid.length; i++){

        for (let j=0; j<grid[i].length; j++){
            if (Hover(i,j)){

                if (grid[i][j] == 1){
                    grid[i][j] = 0
                }else{
                    grid[i][j] = 1
                }
            }
        }
    }
}

function hoverCell(e){

    MX = e.clientX
    MY = e.clientY
    effX = MX - rect.left
    effY = MY - rect.top
}

window.addEventListener('click', toggleCell)
window.addEventListener('mousemove', hoverCell)

/// ACTIONS

setGrid(Rows, Cols)

let loop = () => {

    setDimensions()
    Id('dim-x').value = Cols
    Id('dim-y').value = Rows

    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    drawGrid()

    for (let i=0; i<grid.length; i++){

        for (let j=0; j<grid[i].length; j++){
            if (Hover(i,j)){

                ctx.globalAlpha = 0.3
                ctx.fillStyle = 'red'
                ctx.fillRect(canvas.width/2+(j-grid[i].length/2)*gridSize, canvas.height/2+(i-grid.length/2)*gridSize*1, gridSize, gridSize)
                ctx.globalAlpha = 1
            }
        }
    }

    let result = 0

    switch (SELECT.value){
        case 'count':
            result = Count()
            break
        case 'abacus':
            result = Abacus()
            break
        case 'difference-row':
            result = DifferenceRow()
            break
        case 'distance-origin':
            result = DistanceOrigin()
            break
        default:
            break
    }

    if (SELECT.value == 'abacus' && Rows != 5){
        ErrorMsg('The abacus requires a grid of height 5.')
    }

    TEXT.innerHTML = result

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
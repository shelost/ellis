/// SETUP

let canvas = Id('canvas')
let ctx = canvas.getContext('2d')
let grid, gridSize, MX, MY, effX, effY, rect

let Cols = 5, Rows = 5

let SELECT = Id('algs')
let TEXT = Id('text')

function setGrid(a,b){

    grid = []
    for (i=0; i<a; i++){
        row = []
        for (j=0; j<b; j++){
            row.push(0)
        }
        grid.push(row)
    }
}

function ErrorMsg(msg){
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.font = '16px sans-serif'
    ctx.fillText(msg, canvas.width/2-ctx.measureText(msg).width/2, canvas.height/2-8)

}

function drawGrid(){

    if (grid.length > grid[0].length){
        gridSize = canvas.width*0.8/grid.length
    }else{
        gridSize = canvas.width*0.8/grid[0].length
    }

    for (let i=0; i<grid.length; i++){
        for (let j=0; j<grid[i].length; j++){
            if (grid[i][j] == 1){
                ctx.fillStyle = 'red'
            }else{
                ctx.fillStyle = 'black'
            }
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 0.2
            ctx.fillRect(canvas.width/2+(j-grid[i].length/2)*gridSize, canvas.height/2+(i-grid.length/2)*gridSize*1, gridSize, gridSize)
            ctx.strokeRect(canvas.width/2+(j-grid[i].length/2)*gridSize, canvas.height/2+(i-grid.length/2)*gridSize*1, gridSize, gridSize)
        }
    }
}

function setDimensions(){
    if (window.innerWidth > 900){
        canvas.width = window.innerWidth*0.4
        canvas.height = window.innerWidth*0.4
    }else{
        canvas.width = window.innerWidth*0.9
        canvas.height = window.innerWidth*0.9
    }

    rect = Id('canvas').getBoundingClientRect()
}

function Clear(){
    for (let i=0; i<grid.length; i++){
        for (let j=0; j<grid[i].length; j++){
            grid[i][j] = 0
        }
    }
}

function Random(){
    for (let i=0; i<grid.length; i++){
        for (let j=0; j<grid[i].length; j++){
            grid[i][j] = 0

            if (Math.random() > 0.6){
                grid[i][j] = 1
            }
        }
    }
}

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

    ctx.fillStyle = '#e0e0e0'
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
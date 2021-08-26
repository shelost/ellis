let canvas = Id('canvas')
let ctx = canvas.getContext('2d')
let grid, gridSize, MX, MY, effX, effY, rect

let Cols = 13, Rows = 13

const WORD_SELECT = Id('word-algs')
const NUM_SELECT = Id('num-algs')
const WORD = Id('word')
const NUMBER = Id('number')

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

function ErrorMsg(msg, color, stroke){
    if (color){
        ctx.fillStyle = color
    }else{
        ctx.fillStyle = '#e0e0e0'
    }
    ctx.fillRect(0,0, canvas.width, canvas.height)
    if (stroke){
        ctx.strokeStyle = stroke
        ctx.lineWidth = 1
        ctx.strokeRect(0,0, canvas.width, canvas.height)
    }
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
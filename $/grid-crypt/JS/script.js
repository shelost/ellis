/// SETUP

const TOGGLE = Id('toggle')
let SHOW = true

/// INTERACTION

TOGGLE.onclick = () => {
    if (SHOW == true){
        SHOW = false
    }else{
        SHOW = true
    }
}

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

    switch (WORD_SELECT.value){
        case 'double-row':
            DoubleRow()
            break
        case 'quad-col':
            QuadCol()
            break
        default:
            break
    }

    let result = ''

    switch (NUM_SELECT.value){
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

    NUMBER.value = result

    if(WORD.value.length < 1){
        ErrorMsg('Waiting for text...')
    }

    if (NUM_SELECT.value == 'abacus' && grid.length != 5){
        ErrorMsg('The abacus requires a grid of height 5.')
        NUMBER.value = 'N/A'
    }

    // SHOW & HIDE KEY

    if (SHOW == true){
        TOGGLE.innerHTML = 'Hide Key'
        TOGGLE.classList.remove('blue')
        TOGGLE.classList.add('red')
        if (window.innerWidth > 900){
            for (let i=0; i<Class('show').length; i++){
                let elem = Class('show')[i]
                elem.style.opacity = 1
            }
            for (let i=0; i<Class('hide').length; i++){
                let elem = Class('hide')[i]
                elem.style.opacity = 0
            }
        }
    }else{
        TOGGLE.innerHTML = 'Show Key'
        TOGGLE.classList.remove('red')
        TOGGLE.classList.add('blue')

        if (window.innerWidth > 900){
            for (let i=0; i<Class('show').length; i++){
                let elem = Class('show')[i]
                elem.style.opacity = 0
            }

            for (let i=0; i<Class('hide').length; i++){
                let elem = Class('hide')[i]
                elem.style.opacity = 1
            }
        }

        ErrorMsg('Key Hidden', 'white', 'black')
    }

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
let prevX, prevY
let mousedown = false
let Points = []

let Strokes = 0
let Limit = 2
let N = 1
let ALGORITHM = connectOrder_key
let KEY = ALGORITHM(N)


// DRAW

function Point(x,y,n){

    this.x = x
    this.y = y
    this.n = n

    this.rx = this.x/canvas.width
    this.ry = this.y/canvas.height

    this.draw = () => {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, 3,3)
    }

    this.line = p => {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(this.x, this.y)
        ctx.closePath()
        ctx.stroke()
    }

    this.distance = p => {
        dist = Math.sqrt((p.x - this.x)**2 + (p.y - this.y)**2)
        return dist
    }
}

function draw(){
    mousedown = true

    if (onGrid(effX, effY) && Strokes < Limit){
        Points.push(new Point(effX, effY, 1))
    }

}

function onCanvas(x,y){

    if (x > 0 && x < canvas.width && y > 0 && y < canvas.height){
        return true
    }else{
        return false
    }
}

function onGrid(x,y){

    if (x > canvas.width/2-grid[0].length/2*gridSize && x < canvas.width/2+grid[0].length/2*gridSize&& y > 0 &&
        y > canvas.height/2-grid.length/2*gridSize && y < canvas.width/2+grid.length/2*gridSize){
        return true
    }else{
        return false
    }
}

function stop(){
    mousedown = false
    Points.push(new Point(-1,-1, 0))
}

function move(e){

    MX = e.clientX
    MY = e.clientY
    effX = MX - rect.left
    effY = MY - rect.top

    if (mousedown){
        draw()
    }
}

function Resize(){

    for (let i=0; i<Points.length; i++){

        p = Points[i]

        p.x = p.rx*canvas.width
        p.y = p.ry*canvas.height
    }
}

function strokeCount(){

}

window.addEventListener('mousedown', draw)
window.addEventListener('mouseup', stop)
window.addEventListener('mousemove', move)
window.addEventListener('resize', Resize)
Id('canvas').addEventListener("mouseleave", () => {
    Points.push(new Point(-1,-1, 0))
})

// PUZZLE

function contact(i,j,n){

    let p = Points[n]

    if (p.x > canvas.width/2+(j-grid[i].length/2)*gridSize && p.x < canvas.width/2+(j-grid[i].length/2+1)*gridSize &&
        p.y > canvas.height/2+(i-grid.length/2)*gridSize && p.y < canvas.height/2+(i-grid.length/2+1)*gridSize){
        return true
    }else{
        return false
    }
}

function connectOrder_check(){

    let contacts = []
    let result = {value: false, msg: 'hello'}

    // Actual Order
    for (let i=0; i<Points.length; i++){
        let p = Points[i]

        for (let j=0; j<KEY.length; j++){
            let k = KEY[j]

            if (contact(k.i, k.j, i)){
                // Check for duplicates
                /*
                if (contacts.length > 1 && contacts[contacts.length-1].i != k.i && contacts[contacts.length-1].j != k.j){
                    contacts.push({i: k.i, j: k.j, n: i})
                }
                */

                if (contacts.length > 0){
                    if (contacts[contacts.length-1].i != k.i && contacts[contacts.length-1].j != k.j){
                        contacts.push({i: k.i, j: k.j, n: i})
                    }
                }else{
                    contacts.push({i: k.i, j: k.j, n: i})
                }


            }
        }
    }

    // Check if inclusive of correct order
    for (let i=0; i<KEY.length; i++){
        let k = KEY[i]

        for (let j=0; j<contacts.length; j++){
            let p = contacts[j]

        }
    }

    console.log(KEY)
    console.log(contacts)

    return result
}

function equalArrays(a,b){
    return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function Check(){

    let alg

    switch(ALGORITHM){
        case connectOrder_key:
            alg = connectOrder_check()
            break
        default:
            alg = true
            break
    }

    if (alg.value){
        Id('display').innerHTML =
        `
        <div id = 'img'> :) </div>
        <h1> Correct </h1>
        `
    }else{
        Id('display').innerHTML =
        `
        <div id = 'img'> :( </div>
        <h1> Incorrect </h1>
        `
    }
}

function clearPoints(){
    Points = []
    Strokes = 0
}

function newExample(){
    Clear()
    let KEY = ALGORITHM(N)
    setProblem(KEY)
}

// CONTROLS

function Undo(){

    Points.pop()
    Points.pop()
    Points.pop()
    Strokes -= 1
    console.log(Strokes)

    if (Points.length > 3){
        while (Points[Points.length-1].x > 0){
            Points.pop()
        }
    }
}

Id('undo').onclick = Undo
Id('clear').onclick = clearPoints
Id('check').onclick = Check
Id('new').onclick = newExample

// ACTIONS

setGrid(Rows, Cols)
setProblem(KEY)

let loop = () => {

    setDimensions()

    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    //         Black, Yellow, Green, Cyan, Purple, Orange, Blue
    drawGrid(['black', '#FFE800', '#27FF00', '#00F3FF', '#CC56FF', '#FFA600', '#036AFF'],'black')

    for (let i=0; i<Points.length; i++){

        let p = Points[i]

        if (i > 0){

            let prev = Points[i-1]

            if (prev.x > 0 && p.x > 0){
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 5
                ctx.lineCap = 'round'
                p.line(Points[i-1])
            }
        }
    }


    /*
    switch (WORD_SELECT.value){
        case 'double-row':
            break
        case 'six-col':
            break
        default:
            break
    }
    */

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
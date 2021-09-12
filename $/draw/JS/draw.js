let prevX, prevY
let mousedown = false
let Points = []
let Strokes = 0
let Limit = 1
let N = 2
let ALGORITHM = connectOrder
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

    if (onGrid(effX, effY)){

        if (Strokes < Limit){

            if (!mousedown){
                Points.push([])
            }
            mousedown = true
            Points[Points.length-1].push(new Point(effX, effY, 1))

        }else{

            Id('strokes').classList.add('alert')

            setTimeout(()=> {
                Id('strokes').classList.remove('alert')
            }, 3000)

        }
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
    Strokes = Points.length
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
        for (let j=0; j<Points[i].length; j++){
            p = Points[i][j]

            p.x = p.rx*canvas.width
            p.y = p.ry*canvas.height
        }
    }
}

window.addEventListener('mousedown', draw)
window.addEventListener('mouseup', stop)
window.addEventListener('mousemove', move)
window.addEventListener('resize', Resize)
Id('canvas').addEventListener("mouseleave", () => {
    /*Points.push(new Point(-1,-1, 0))*/
})




// PUZZLE

function contact(i,j,m,n){

    let p = Points[m][n]

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

    // Cycle through points
    for (let i=0; i<Points.length; i++){

        for (let j=0; j<Points[i].length; j++){
            let p = Points[i][j]

            // Cycle through key
            for (let v=0; v<KEY.length; v++){

                let k = KEY[v]

                if (contact(k.i, k.j, i, j)){

                    // Check for duplicates
                    if (contacts.length > 0){

                        let duplicate = false

                        for (let z=0;z<contacts.length; z++){
                            let c = contacts[z]

                            if (c.i == k.i && c.j == k.j){
                                duplicate = true
                            }
                        }

                        if (!duplicate){
                            contacts.push({i: k.i, j: k.j, n: i})
                        }

                    }else{
                        contacts.push({i: k.i, j: k.j, n: i})
                    }
                }
            }
        }
    }

    // Check if correct order
    if (contacts.length == KEY.length){
        for (let i=0; i<contacts.length; i++){
            let c = contacts[i]
            let k = KEY[i]

            result.value = true
            result.msg = "Correct"

            if (c.i != k.i || c.j != k.j){
                result.value = false
                result.msg = "Incorrect Order"
            }
        }
    }else{
        result.value = false
        result.msg = "Did not hit all the points"
    }

    return result
}




// CONTROLS

function Check(){

    let alg

    switch(ALGORITHM){
        case connectOrder:
            alg = connectOrder_check()
            break
        case territory:
            alg = territory_check()
            break
        default:
            alg = true
            break
    }

    if (alg.value){
        Id('result').innerHTML =
        `
        <div id = 'img'> :) </div>
        <h1> ${alg.msg} </h1>
        `
    }else{
        Id('result').innerHTML =
        `
        <div id = 'img'> :( </div>
        <h1> ${alg.msg} </h1>
        `
    }
}

function clearPoints(){
    Points = []
    Strokes = 0
}

function newExample(){
    Clear()
    clearPoints()
    KEY = ALGORITHM(N)
    setProblem(KEY)
}

function Undo(){

    Points.pop()
    Strokes = Points.length
}

Id('undo').onclick = Undo
Id('clear').onclick = clearPoints
Id('check').onclick = Check
Id('new').onclick = newExample

Id('node-plus').onclick = () => {
    if (N < 7){
        N++
    }
}

Id('node-minus').onclick = () => {
    if (N > 1){
        N--
    }
}

Id('apply').onclick = newExample





// ACTIONS

setGrid(Rows, Cols)
setProblem(KEY)

let loop = () => {

    setDimensions()

    Id('strokes').innerHTML = `${Strokes} / ${Limit}`
    Id('nodes').innerHTML = `${N}`

    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    //         Black, Yellow, Green, Cyan, Purple, Orange, Blue
    drawGrid(['black', '#FFE800', '#27FF00', '#00F3FF', '#CC56FF', '#FFA600', '#036AFF'],'black')

    for (let i=0; i<Points.length; i++){

        for (let j=0; j<Points[i].length; j++){

            let p = Points[i][j]

            if (j > 0){

                let prev = Points[i][j-1]

                if (prev.x > 0 && p.x > 0){
                    ctx.strokeStyle = 'red'
                    ctx.lineWidth = 5
                    ctx.lineCap = 'round'
                    p.line(prev)
                }
            }
        }
    }

    ctx.fillStyle = 'red'
    ctx.globalAlpha = 1
    if (Strokes > Limit-1){
        ctx.globalAlpha = 0.5
    }
    let r = 5
    if (mousedown){
        r = 10
    }
    ctx.arc(effX, effY, r, 0, Math.PI*2)
    ctx.fill()

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
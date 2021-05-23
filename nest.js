class Nest {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    update() {
        fill(255,0,255)
        ellipse(this.x, this.y, 40,40)
    }
}
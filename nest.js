class Nest {
    constructor(x,y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    update() {
        fill(255,0,255)
        ellipse(this.x, this.y, this.size,this.size)
    }

    grow() {
        this.size += .1
    }
}
class Food {

    constructor(x, y, value) {
        this.x = x
        this.y = y
        this.l = createVector(x,y)
        this.value = value
    }

    update() {
        this.l = createVector(this.x,this.y)
        ellipse(this.x, this.y, this.value/2,this.value/2)
    }
}
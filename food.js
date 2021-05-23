class Food {

    //TODO fix bug with some anys becoming afk when eating

    constructor(x, y, value) {
        this.x = x
        this.y = y
        this.l = createVector(x,y)
        this.value = value
    }

    update() {
        this.l = createVector(this.x,this.y)
        this.getEaten()
        ellipse(this.x, this.y, this.value/2,this.value/2)
    }

    getEaten() {
    }
}
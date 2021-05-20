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
        for(let i = 0; i<ants.length; i++) {
            let dist = p5.Vector.dist(ants[i].l,this.l)

            if(dist <= this.value) {
                this.value = this.value > .5 ? this.value - .3 : 0 
            }

        }
    }
}
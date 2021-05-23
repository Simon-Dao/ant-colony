let SEARCHING = 1
let EATING = 2
let RETURNING = 3

class Ant {

    constructor(x,y) {
        this.l = createVector(x,y)
        this.seed = random(0,360)
        this.rand = createVector(0,0)
        this.w = 20
        this.h = 40
        this.speed = 1
        this.v = createVector(0,0)
        this.foodRange = 100
        this.foodCarry = 0.5
        this.foodSightRange = 150
        this.movementMode = SEARCHING
        this.closest = null
        this.foodInStomach = 0
        this.startTime = 0
        this.endTime = 0
        this.timerSet = 0
    }

    update() {
        switch(this.movementMode) {
          case SEARCHING:
            this.searchMode()
            break
          case EATING:
            this.eatingMode()
            break
          case RETURNING:
            this.returningMode()
        }

        this.v.limit(3)
        this.l.add(this.v)
        this.enforceBounds()
        
        stroke(255,255,255)
        fill(255,255,255)
        ellipse(this.l.x,this.l.y,5,5)
    }

    searchMode() {
      this.v = createVector(0,0)
      this.moveRandomly(.01)
      
      if(this.moveToFood()) {
        this.movementMode = EATING
      }
    }

    eatingMode() {

      if(!this.timerSet) {
        this.timerSet = true
        this.startCounting()
      }
      else 
      if(this.elapsedSeconds() >= 2) {
        this.timerSet = false
        this.movementMode = RETURNING
      } else {
        this.v.setMag(0)
      }
      
    }

    elapsedSeconds() {
      this.endTime = new Date()
      let diff = this.endTime - this.startTime
      diff /= 1000

      return Math.floor(diff) + 1
    }

    returningMode() {
      if(!this.timerSet) {
        this.timerSet = true
      }
      else
      if(this.elapsedSeconds() >= 6) {
        this.movementMode = SEARCHING
        this.timerSet = false
      } else {
        let newVector = p5.Vector.sub(createVector(nest.x,nest.y),this.l)
        newVector.limit(2)
  
        this.v.add(newVector)
        this.moveRandomly(2)
      }


    }

    moveRandomly(strength) {
      if(frameCount % Math.floor(random(10,15)) == 0) {
        this.rand = this.generateRandomVector(strength)
        this.rand.sub(this.l)
        this.rand.limit(2)
      }
      this.v.add(this.rand)
    }

    moveToMouse() {
      let mouseVector = createVector(mouseX,mouseY)
      mouseVector.sub(this.l)
      mouseVector.setMag(2)
      this.v.add(mouseVector)
    }

    generateRandomVector(strength) {
        let coords = this.generateUnitCoords(strength)
      
        let x = coords.x
        let y = coords.y

        let c = 0
        while(!this.withinBoundries(x,y) && c < 2000) {
            let coords = this.generateUnitCoords(strength)
            let x = coords.x
            let y = coords.y
            c++
        }
      
        //stroke(255,255,255)
        //line(this.l.x,this.l.y,x,y)

        return createVector(x,y)
    }
      
    moveToFood() {
    
      let closest = this.getClosestFood()
      
      if(!closest) return

      let newVector = p5.Vector.sub(closest.l, this.l)

      newVector.limit(2.5)
      this.v.add(newVector)

      return p5.Vector.dist(closest.l, this.l) < closest.value/2
    }

    getClosestFood() {
      let foodInRange = this.getFoodInRange()
      if(foodInRange.length == 0) return

      let closest = foodInRange[0]
      let closestDist = p5.Vector.dist(closest.l, this.l)

      for(let i = 0; i < foodInRange; i++) {

        let currentDist = p5.Vector.dist(foodInRange[i].l, this.l)

        if(closestDist > currentDist) {
          closest = foodInRange[i]
          closestDist = currentDist
          foodIndex = i
        } 
      }
      return closest
    }

    generateUnitCoords(strength) {
      this.seed += strength
      let randAngle = noise(this.seed) * 100 
      let randomMag = random(0,10)
  
      let x = Math.cos(randAngle) * randomMag
      let y = Math.sin(randAngle) * randomMag
      x += this.l.x
      y += this.l.y

      return {
          x: x,
          y: y
      }
    }

    getFoodInRange() {

      let inRange = []

      for(let i = 0; i<food.length; i++) {
        if(p5.Vector.dist(this.l,food[i].l) <= this.foodSightRange)
          inRange.push(food[i])
      }
      return inRange
    }
    

    withinBoundries(x,y) {
      return x > 100 && x < 700 && y > 100 && y < 700
    }
    
    enforceBounds() {
      if(this.l.x < 100) {
        this.l.x = 100
      } else
      if(this.l.x > 700) {
        this.l.x = 700
      }
    
      if(this.l.y < 100) {
        this.l.y = 100
      } else
      if(this.l.y > 700) {
        this.l.y = 700
      }
    }

    startCounting() {
      this.startTime = new Date()
    }
}
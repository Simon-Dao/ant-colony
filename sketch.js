let ants = []
let food = []
let NUM_OF_ANTS = 50
let pos

function setup() {
  createCanvas(800, 800);
  background(0)
  frameRate(60)

  for(let i = 0; i<NUM_OF_ANTS; i++) {
    ants.push(new Ant(400,400, random(0,360)))
  }

  rectMode(CENTER)
  angleMode(DEGREES)
}

function draw() {
  background(0)

  ants.forEach(ant => {ant.update()})

  food.forEach(f => {f.update()})
}

function mouseClicked() {
  if(food.length <= 5)
  food.push(new Food(mouseX,mouseY, Math.floor(random(20,50))))
}

function random(min, max) {
  return Math.floor(Math.random() * (max-min) + min)
}
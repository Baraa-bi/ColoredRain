let dropNum = 200;
let width = 3, height = 13; // of rain drop
let rain = [], circle = [];
let maxX = window.innerWidth - width , maxY = window.innerHeight;
let minX = 0, minY = 0;
let bgColor = 255;
let fRate = 100;
let circleW = 60, circleH = 10;
let coloringType = 1;

function setup(){
  // create the canvas
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fRate)

  // create rain drops with random posion
  for (var i = 0; i < 500; i++) {
    let rndX = getIntRand(minX, maxX);
    let rndY = getIntRand(minY, maxY) * -1;
    rain.push(new Drop(rndX,rndY));
  }

}

function draw(){
  // clear the canvas
  clear() ;


  for (var i = 0; i < dropNum; i++) {

    //draw the drop
    noStroke();
    fill(rain[i].color);
    rect(rain[i].x, rain[i].y, width, height);

    // animate the drop
    rain[i].y += rain[i].speed;

    if(rain[i].y >= rain[i].deadTime){

      if(circle.length <= 1 && getIntRand(5, 20) % 11 == 0){
        circle.push(new DropCircle(rain[i].x, rain[i].y, circleW, circleH, rain[i].color));
      }
      rain[i].relife();
    }

    for (let j = 0; j < circle.length; j++) {
      if(circle[j].isEnough()){
        circle.splice(j, 1);
      } else {
        noFill();
        stroke(circle[j].color);
        // strokeWeight(1)
        ellipse(circle[j].x, circle[j].y, circle[j].width, circle[j].height);
        circle[j].update();
      }
    }
  }
}


// single rain drop
let Drop = function(x, y){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.updateXPos = function(){
    this.x = getIntRand(minX, maxX);
  }

  this.relife = function(){
    this.y = getIntRand(minY, maxY) * -1;
    this.speed = getIntRand(5, 9);
    this.color = generateColor(getIntRand(0,255), getIntRand(0,255), getIntRand(0,255));
    this.deadTime = map(this.speed, 5, 9, maxY-120, maxY-50);

  }
  this.relife();


}

let DropCircle = function(x, y, width, height,color){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.life = 0;
  this.color=color;

  this.update = function(){
    this.width += 0.008;
    this.height += 0.004;
    this.life++;
  }

  this.isEnough = function(){
    if(this.life == 4000)
      return true;

    return false;
  }
}

// generate random integer number
function getIntRand(min, max){
  max++;
  return Math.floor(min + Math.random() * max);
}


// generate rain colors
let mask = 0b01110100;
function generateColor(red, green, blue){

  if(coloringType == 1){
    red = red ^ mask;
    green = green ^ mask;
    blue = blue ^ mask;
  } else if(coloringType == 2){
      red = red | mask;
      green = green | mask;
      blue = blue | mask;
  } else if(coloringType == 3){
      red = red & mask;
      green = green & mask;
      blue = blue & mask;
  }
  return 'rgb(' + red +',' +  green + ',' + blue + ')';
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maxX = windowWidth;
  maxY = windowHeight;

  for (var i = 0; i < dropNum; i++) {
      rain[i].updateXPos();
  }
}

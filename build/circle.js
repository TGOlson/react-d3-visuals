(function() {

function Circle() {}

Circle.generation = {
  value: -200,
  min: -500,
  max: -10,
  scalar: -1,
  randomized: false
};

Circle.startRadius = {
  value: 25,
  min: 20,
  max: 500,
  randomized: false
};

Circle.endRadius = {
  value: 150,
  min: 20,
  max: 500,
  randomized: false
};

Circle.duration = {
  value: 2000,
  min: 150,
  max: 3000,
  randomized: false
};

Circle.fillOpacity = {
  value: 0,
  min: 0,
  max: 100,
  scalar: 0.02,
  randomized: false
};

Circle.location = {
  value: 100,
  min: 0,
  max: 100,
  scalar: 0.01
};

Circle.color = d3.scale.category20c();

Circle.svg = null;

Circle.start = function(){
  this.setSvgCanvas();
  this.setClickEvents();
  this.setTimeEvents();

  this.generating = true;
};

Circle.setSvgCanvas = function(width, height){
  this.svg = d3.select('body').append('svg');
  this.svg.append('rect');
};

Circle.setTimeEvents = function(){
  var _this = this;

  (function randomInterval() {

    setTimeout(function() {
      _this.appendNewCircle();

      // recursively call self to see if interval has changed
      randomInterval();
    }, _this.get('generation'));

  })();
};

Circle.setClickEvents = function(){
  // $('body').click(this.appendNewCircle.bind(this));
};

Circle.appendNewCircle = function(e){
  var startRadius = this.get('startRadius'),
    color = this.getColor(),
    fillOpacity = this.get('fillOpacity'),
    duration = this.get('duration'),
    endRadius = this.get('endRadius'),
    location = this.getLocation();

  this.svg.insert('circle', 'rect')
  .attr('cx', location.x)
  .attr('cy', location.y)
  .attr('r', startRadius)
  .style('stroke', color)
  .style('stroke-opacity', 1)
  .style('fill', color)
  .style('fill-opacity', fillOpacity)
  .transition()
  .duration(duration)
  .ease(Math.sqrt)
  .attr('r', endRadius)
  .style('stroke-opacity', 1e-6)
  .style('fill-opacity', 1e-6)
  .remove();
};

Circle.get = function(property) {
  var prop = this[property],
    scalar = prop.scalar || 1,
    value = prop.value * scalar,
    posOrNeg;

  if(prop.randomized) {
    value += value / 2 * randomPolarity();
  }

  return value;
};

Circle.getColor = function() {
  return this.color(randomInt(20));
};

Circle.getLocation = function(e) {
  var xLocation,
    yLocation,
    randomness;

  // can accept click events
  if (e){
    xLocation = e.clientX;
    yLocation = e.clientY;
  } else {

    // default position to center of the window
    xLocation = window.innerWidth / 2;
    yLocation = window.innerHeight / 2;

    randomness = this.get('location');

    // add randomness as necessary
    if(randomness) {
      xLocation += xLocation * makeRandomPosition(randomness);
      yLocation += yLocation * makeRandomPosition(randomness);

    }
  }

  function makeRandomPosition(randomness) {
    return Math.random() * randomPolarity() * randomness;
  }

  return {
    x: xLocation,
    y: yLocation
  };
};

Circle.set = function(property, value) {
  this[property].value = value;
};

Circle.toggleRandom = function(property) {
  this[property].randomized = !this[property].randomized;
};

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

// returns 1 or -1
function randomPolarity() {
  return Math.round(Math.random()) * 2 - 1;
}

window.onload = Circle.start.bind(Circle);

window.Circle = Circle;

})();

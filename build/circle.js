(function() {

function Circle() {}

Circle.generating = false;

Circle.generation = {
  value: -200,
  min: -500,
  max: -10,
  scalar: -1,
  randomized: false
};

Circle.startRadius = {
  value: 25,
  min: 15,
  max: 300,
  randomized: false
};

Circle.endRadius = {
  value: 150,
  min: 15,
  max: 300,
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
  scalar: 0.04,
  randomized: false
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
      if(_this.generating) {
        _this.appendNewCircle();
      }

      // recursively call self to generate new random interval
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
    xLoc,
    yLoc;

  if (e){
    xLoc = e.clientX;
    yLoc = e.clientY;
  } else {
    xLoc = Math.random() * window.innerWidth - 5;
    yLoc = Math.random() * window.innerHeight - 5;
  }

  this.svg.insert('circle', 'rect')
  .attr('cx', xLoc)
  .attr('cy', yLoc)
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
    value = prop.value * scalar;

  if(prop.randomized) {
    var posOrNeg = Math.round(Math.random()) * 2 - 1;
    random = value / 2 * posOrNeg;
    value += random;
  }

  return value;
};

Circle.getColor = function() {
  return this.color(Math.floor( Math.random()*20 + 1 ));
};

Circle.set = function(property, value) {
  this[property].value = value;
};

Circle.toggleRandom = function(property) {
  this[property].randomized = !this[property].randomized;
};

Circle.pause = function(){
  this.generating = false;
};

window.onload = Circle.start.bind(Circle);

window.Circle = Circle;

})();

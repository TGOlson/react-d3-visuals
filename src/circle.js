(function() {

function Circle() {}

Circle.generating = false;

Circle.generation = {
  value: 50,
  min: 1,
  max: 100
};

Circle.startRadius = {
  value: 5,
  min: 1,
  max: 100
};

Circle.endRadius = {
  value: 30,
  min: 1,
  max: 100
};

Circle.duration = {
  value: 70,
  min: 1,
  max: 100
};

Circle.fillOpacity = {
  value: 0,
  min: 0,
  max: 100
};

Circle.color = d3.scale.category20c();

// Circle.radiusFactor = 100;

Circle.windowWidth = null;
Circle.windowHeight = null;

Circle.svg = null;

Circle.start = function(){
  this.getWindowDimensions();
  this.setSvgCanvas();
  this.setClickEvents();
  this.setTimeEvents();
  this.setResizeEvents();

  this.generating = true;
};

Circle.getWindowDimensions = function() {
  this.windowWidth = window.innerWidth - 5;
  this.windowHeight = window.innerHeight - 5;
};

Circle.setSvgCanvas = function(width, height){
  this.svg = d3.select("body").append("svg")
    .attr("width", this.windowWidth)
    .attr("height", this.windowHeight);

  this.svg.append("rect")
    .attr("width", this.windowWidth)
    .attr("height", this.windowHeight);
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
    }, _this.getGenerationInterval());

  })();
};

Circle.getColor = function() {
  return this.color(Math.floor( Math.random()*20 + 1 ));
};

Circle.getGenerationInterval = function() {
  // return Math.random() * this.generation.value + this.generation.value;
  return (this.generation.max - this.generation.value) * 2;
};

Circle.getStartRadius = function() {
  // return Math.random() * this.radiusFactor + this.radiusFactor;
  return this.startRadius.value * 5;
};

Circle.getEndRadius = function() {
  // return Math.random() * this.radiusFactor + this.radiusFactor;
  return this.endRadius.value * 5;
};

Circle.getDuration = function() {
  // return Math.random() * this.radiusFactor + this.radiusFactor;
  return this.duration.value * 30;
};

Circle.setClickEvents = function(){
  // $('body').click(this.appendNewCircle.bind(this));
};

// throttle this
Circle.setResizeEvents = function(){
  var _this = this;

  // $(window).resize(function(){
  //   _throttle(500, function() {
  //     $('svg').width( $(window).width() - 5 );
  //     $('svg').height( $(window).height() - 5 );

  //     _this.getWindowDimensions();
  //   });
  // });
};

Circle.appendNewCircle = function(e){
  var xLoc,
    yLoc;

  if (e){
    xLoc = e.clientX;
    yLoc = e.clientY;
  } else {
    xLoc = Math.random() * this.windowWidth;
    yLoc = Math.random() * this.windowHeight;
  }

  var color = this.getColor();

  this.svg.insert("circle", "rect")
  .attr("cx", xLoc)
  .attr("cy", yLoc)
  .attr("r", this.getStartRadius())
  .style("stroke", color)
  .style("stroke-opacity", 1)
  .style('fill', color)
  .style('fill-opacity', this.getFillOpacity())
  .transition()
  .duration(this.getDuration())
  .ease(Math.sqrt)
  .attr("r", this.getEndRadius())
  .style("stroke-opacity", 1e-6)
  .style("fill-opacity", 1e-6)
  .remove();
};

Circle.getFillOpacity = function() {
  if(this.fillOpacity.value === 0) return 0;
  return this.fillOpacity.value / 100;
};

Circle.set = function(property, value) {
  console.log(property, value);
  this[property] = this[property] || {};
  this[property].value = value;
};

// Circle.larger = function() {
//   this.sizeFactor += 10;
// };

// Circle.smaller = function() {
//   var sizeFactor = this.sizeFactor - 10;
//   if(sizeFactor > 0) this.sizeFactor = sizeFactor;
// };

// Circle.faster = function() {
//   var generation.value = this.generation.value - 50;
//   if(generation.value > 0) this.generation.value = generation.value;
// };

// Circle.slower = function() {
//   this.generation.value += 50;
// };

Circle.pause = function(){
  this.generating = false;
};

var _lastCall = null;

// naive throttle - throttles all calls, doesn't track functions
function _throttle(rate, callback) {

  // set time of last call if no calls have been made
  _lastCall = _lastCall || new Date();

  var now = new Date(),
    diff = now - _lastCall;

  if(diff > rate) {
    callback();
    _lastCall = new Date();
  }
}

window.onload = Circle.start.bind(Circle);

window.Circle = Circle;

})();

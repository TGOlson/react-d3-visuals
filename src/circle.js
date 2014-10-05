(function() {

function Circle() {}

Circle.settings = {
  generation: {
    name: 'Generation Interval',
    value: -200,
    min: -500,
    max: -10,
    scalar: -1,
    randomized: false
  },
  startRadius: {
    name: 'Start Radius',
    value: 25,
    min: 20,
    max: 500,
    randomized: false
  },
  endRadius: {
    name: 'End Radius',
    value: 150,
    min: 20,
    max: 500,
    randomized: false
  },
  duration: {
    name: 'Circle Duration',
    value: 2000,
    min: 150,
    max: 3000,
    randomized: false
  },
  fillOpacity: {
    name: 'Fill Opacity',
    value: 0,
    min: 0,
    max: 100,
    scalar: 0.02,
    randomized: false
  },
  location: {
    name: 'Location Randomness',
    value: 100,
    min: 0,
    max: 100,
    scalar: 0.01
  },
  // background: {
  //   name: 'Background Interval',
  //   value: 50,
  //   min: 10,
  //   max: 300,
  //   scalar: 100,
  //   paused: true
  // }
};

Circle.colorScales = [
  d3.scale.category20(),
  d3.scale.category20b(),
  d3.scale.category20c()
];

Circle._svg = null;

Circle.start = function(){
  this.setSvgCanvas();
  this.setClickEvents();
  this.setTimeEvents();
};

Circle.setSvgCanvas = function(width, height){
  this._svg = d3.select('body').append('svg');
  this._svg.append('rect');
};

Circle.setTimeEvents = function(){
  var _this = this;

  (function randomInterval() {

    setTimeout(function() {
      _this.appendNewCircle();

      // recursively call self to see if interval has changed
      randomInterval();
    }, _this.getValue('generation'));

  })();

  // (function randomInterval() {

  //   setTimeout(function() {
  //     if(!_this.get('background').paused) {
  //       _this.setBackground();
  //     }

  //     // recursively call self to see if interval has changed
  //     randomInterval();
  //   }, _this.getValue('background'));

  // })();
};

Circle.setBackground = function(color) {
  color = color || Circle.getColor();
  this.style('svg', {'background-color': color});
};


Circle.setClickEvents = function(){
  var _this = this;

  this._svg.on('click', function() {
    _this.appendNewCircle(d3.event);
  });
};

Circle.appendNewCircle = function(event){
  var startRadius = this.getValue('startRadius'),
    color = this.getColor(),
    fillOpacity = this.getValue('fillOpacity'),
    duration = this.getValue('duration'),
    endRadius = this.getValue('endRadius'),
    location = this.getLocation(event);

  this._svg.insert('circle', 'rect')
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
  return this.settings[property];
};

// this is != to get(property).value
// getValue appropriately scales normal values
Circle.getValue = function(property) {
  var setting = this.get(property),
    scalar = setting.scalar || 1,
    value = setting.value * scalar;

  if(setting.randomized) {
    value += value / 2 * randomPolarity();
  }

  return value;
};

Circle.set = function(property, value) {
  var setting = this.get(property);
  setting.value = value;
};

Circle.style = function(target, style) {
  var element;

  if(target === 'svg') {
    element = this._svg;
  } else {
    throw new Error('No implemented for that target');
  }

  element.style(style);
};

Circle.toggleRandom = function(property) {
  var setting = this.get(property);
  setting.randomized = !setting.randomized;
};

Circle.togglePause = function(property) {
  var setting = this.get(property);
  setting.paused = !setting.paused;
};

Circle.getColor = function() {
  var index = randomInt(2);
    colorScale = this.colorScales[index];

  return colorScale(randomInt(20));
};

Circle.getLocation = function(event) {
  var xLocation,
    yLocation,
    randomness;

  // can accept click events
  if (event){
    xLocation = event.clientX;
    yLocation = event.clientY;
  } else {

    // default position to center of the window
    xLocation = window.innerWidth / 2;
    yLocation = window.innerHeight / 2;

    randomness = this.getValue('location');

    // add randomness as necessary
    if(randomness) {
      xLocation += xLocation * randomPosition(randomness);
      yLocation += yLocation * randomPosition(randomness);

    }
  }

  return {
    x: xLocation,
    y: yLocation
  };
};

function randomPosition(randomness) {
  return Math.random() * randomPolarity() * randomness;
}

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

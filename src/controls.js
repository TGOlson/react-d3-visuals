/** @jsx React.DOM */

var controls = [
  {
    name: 'Generation Speed',
    property: 'generation'
  },
  {
    name: 'Starting Radius',
    property: 'startRadius'
  },
  {
    name: 'Ending Radius',
    property: 'endRadius'
  },
  {
    name: 'Circle Duration',
    property: 'duration'
  },
  {
    name: 'Fill Opacity',
    property: 'fillOpacity'
  }
];

var ControlPad = React.createClass({
  render: function() {
    var _this = this;

    var controls = this.props.controls.map(function(control) {
      var property = Circle[control.property],
        defaultValue = property.value
        min = property.min,
        max = property.max;

      return (
        <Slider name={control.name}
          min={min}
          max={max}
          defaultValue={defaultValue}
          property={control.property}/>
      );
    });
    return (
      <div className="controls">
        {controls}
      </div>
    );
  }
});

var Slider = React.createClass({
  onChange: function(e) {
    Circle.set(this.props.property, e.target.value)
  },

  render: function() {
    return (
      <div className="slider">
        <p>{this.props.name}</p>
        <input type="range"
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.props.defaultValue}
          onChange={this.onChange}/>
      </div>
    );
  }
});

React.renderComponent(
  <ControlPad controls={controls}/>,
  document.getElementById('content')
);

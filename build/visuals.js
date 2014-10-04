/** @jsx React.DOM */

var controls = [
  {
    name: 'Generation Interval',
    min: 0,
    max: 100,
    defaultValue: 50
  },
  {
    name: 'Radius',
    min: 0,
    max: 100,
    defaultValue: 20
  },
  {
    name: 'Fade Duration',
    min: 0,
    max: 100,
    defaultValue: 70
  },
  {
    name: 'Location Variability',
    min: 0,
    max: 100,
    defaultValue: 10
  }
];

var ControlPad = React.createClass({displayName: 'ControlPad',
  render: function() {
    var controls = this.props.controls.map(function(control) {
      return (
        Slider({name: control.name, 
          min: control.min, 
          max: control.max, 
          defaultValue: control.defaultValue})
      );
    });
    return (
      React.DOM.div({className: "controls"}, 
        controls
      )
    );
  }
});

var Slider = React.createClass({displayName: 'Slider',
  onChange: function(e) {
    console.log(e.target.value);
  },

  render: function() {
    return (
      React.DOM.div({className: "slider"}, 
        React.DOM.p(null, this.props.name), 
        React.DOM.input({type: "range", 
          min: this.props.min, 
          max: this.props.max, 
          defaultValue: this.props.defaultValue, 
          onChange: this.onChange})
      )
    );
  }
});

React.renderComponent(
  ControlPad({controls: controls}),
  document.getElementById('content')
);

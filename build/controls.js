/** @jsx React.DOM */

var controlSettings = [
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
  },
  {
    name: 'Location Randomness',
    property: 'location'
  }
];

var ControlPad = React.createClass({displayName: 'ControlPad',
  render: function() {
    var controlNodes = this.props.controlSettings.map(function(settings, i) {
      return (
        Control({settings: settings, key: i})
      );
    });

    return (
      React.DOM.div({className: "controls"}, 
        controlNodes
      )
    );
  }
});

var Control = React.createClass({displayName: 'Control',
  render: function() {
    var settings = this.props.settings,
      property = settings.property,
      values = Circle[property],
      randomToggle;

    if(values.randomized === undefined) {
      randomToggle = null;
    } else {
      randomToggle = Randomizer({property: property})
    }

    return (
      React.DOM.div({className: "control"}, 
        React.DOM.p(null, settings.name), 

        Slider({property: property, 
          min: values.min, 
          max: values.max, 
          defaultValue: values.value}), 
        randomToggle
      )
    );
  }
});

var Slider = React.createClass({displayName: 'Slider',
  onChange: function(e) {
    Circle.set(this.props.property, e.target.value);
  },

  render: function() {
    return (
      React.DOM.input({type: "range", 
        min: this.props.min, 
        max: this.props.max, 
        defaultValue: this.props.defaultValue, 
        onChange: this.onChange})
    );
  }
});

var Randomizer = React.createClass({displayName: 'Randomizer',
  onChange: function(e) {
    Circle.toggleRandom(this.props.property);
  },

  render: function() {
    return (
      React.DOM.input({type: "checkbox", onChange: this.onChange})
    );
  }
});

React.renderComponent(
  ControlPad({controlSettings: controlSettings}),
  document.getElementById('content')
);

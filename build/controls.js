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
  toggleView: function() {
    var props = this.props;

    props.visible = !props.visible;

    this.setState(props);
  },

  makeControlNodes: function(settings) {
    return this.props.controlSettings.map(function(settings, i) {
      return (
        Control({settings: settings, key: i})
      );
    });
  },

  render: function() {

    var controlNodes = this.makeControlNodes(this.props.controlSettings),
      klass = this.props.visible ? "show" : "hide",
      buttonIcon = this.props.visible ? "<<" : ">>";

    return (
      React.DOM.div({className: "control-pad " + klass}, 
        React.DOM.span({className: "toggle-controls", onClick: this.toggleView}, buttonIcon), 
        React.DOM.div({className: "controls"}, 
          controlNodes
        )
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
          value: values.value}), 
        randomToggle
      )
    );
  }
});

var Slider = React.createClass({displayName: 'Slider',
  onChange: function(e) {
    var props = this.props,
      value = e.target.value;

    props.value = value;

    this.setState(props);

    Circle.set(props.property, value);
  },

  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.input({type: "range", 
          min: this.props.min, 
          max: this.props.max, 
          value: this.props.value, 
          onChange: this.onChange}), 
        React.DOM.span(null, " ", this.props.value)
      )
    );
  }
});

var Randomizer = React.createClass({displayName: 'Randomizer',
  onChange: function(e) {
    Circle.toggleRandom(this.props.property);
  },

  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.input({type: "checkbox", onChange: this.onChange}), 
        React.DOM.span(null, " randomize")
      )
    );
  }
});

React.renderComponent(
  ControlPad({controlSettings: controlSettings, visible: true}),
  document.getElementById('content')
);

  /** @jsx React.DOM */

var controlSettings = Circle.settings;

var ControlPad = React.createClass({displayName: 'ControlPad',
  toggleView: function() {
    var props = this.props;
    props.visible = !props.visible;
    this.setState(props);
  },

  makeControlNodes: function(settings) {
    var  controlSettings = this.props.controlSettings,
      nodes = [],
      node;

    for(var i in controlSettings) {
      node = (
        Control({settings: controlSettings[i], key: i})
      );

      nodes.push(node);
    }


    return nodes;
  },

  handleColorSelection: function() {
    console.log('selecting');
  },

  render: function() {

    var controlNodes = this.makeControlNodes(this.props.controlSettings),
      klass = this.props.visible ? "show" : "hide",
      icon = this.props.visible ? "left" : "right";

    return (
      React.DOM.div({className: "control-pad " + klass}, 
        React.DOM.i({className: "control-toggle fa fa-angle-double-" + icon, onClick: this.toggleView}), 
        React.DOM.div({className: "controls"}, 
          controlNodes, 
          ColorPicker(null)
        )
      )
    );
  }
});

var Control = React.createClass({displayName: 'Control',
  render: function() {
    var settings = this.props.settings,
      property = this.props.key,
      randomToggle,
      pauseToggle;

    if(settings.randomized === undefined) {
      randomToggle = null;
    } else {
      randomToggle = Randomizer({property: property})
    }

    if(settings.paused === undefined) {
      pauseToggle = null;
    } else {
      pauseToggle = Pauser({property: property, paused: settings.paused})
    }

    return (
      React.DOM.div({className: "control"}, 
        React.DOM.p({className: "noselect"}, settings.name), 

        Slider({property: property, 
          min: settings.min, 
          max: settings.max, 
          value: settings.value}), 
        randomToggle, 
        pauseToggle
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
      React.DOM.input({type: "range", 
        min: this.props.min, 
        max: this.props.max, 
        value: this.props.value, 
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
      React.DOM.label({className: "toggle"}, 
        React.DOM.input({type: "checkbox", onChange: this.onChange}), 
        React.DOM.i({className: "fa fa-random"})
      )
    );
  }
});

var Pauser = React.createClass({displayName: 'Pauser',
  onChange: function(e) {
    var props = this.props;

    props.paused = !props.paused;
    this.setState(props);

    Circle.togglePause(this.props.property);
  },

  render: function() {
    var icon = this.props.paused ? "play" : "pause";

    return (
      React.DOM.label({className: "toggle"}, 
        React.DOM.input({type: "checkbox", 
          checked: this.props.paused, 
          onChange: this.onChange}), 
        React.DOM.i({className: "fa fa-" + icon})
      )
    );
  }
});

var ColorPicker = React.createClass({displayName: 'ColorPicker',
  handleColorSelection: function(e) {
    var value = e.target.value;

    // TODO: create svg styling helper
    Circle.style('svg', {'background-color': e.target.value});
  },

  render: function() {
    return (
      React.DOM.div({className: "color-picker"}, 
        React.DOM.p(null, "Background"), 
        React.DOM.input({type: "color", 
          onChange: this.handleColorSelection, 
          defaultValue: "#333333"})
      )
    );
  }
});

React.renderComponent(
  ControlPad({controlSettings: controlSettings, visible: true}),
  document.getElementById('content')
);

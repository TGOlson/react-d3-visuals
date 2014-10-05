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

  render: function() {

    var controlNodes = this.makeControlNodes(this.props.controlSettings),
      klass = this.props.visible ? "show" : "hide",
      iconDirection = this.props.visible ? "left" : "right";

    return (
      React.DOM.div({className: "control-pad " + klass}, 
        React.DOM.i({className: "control-toggle fa fa-angle-double-" + iconDirection, onClick: this.toggleView}), 
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
      property = this.props.key,
      randomToggle;

    if(settings.randomized === undefined) {
      randomToggle = null;
    } else {
      randomToggle = Randomizer({property: property})
    }

    return (
      React.DOM.div({className: "control"}, 
        React.DOM.p({className: "noselect"}, settings.name), 

        Slider({property: property, 
          min: settings.min, 
          max: settings.max, 
          value: settings.value}), 
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
      React.DOM.label({className: "randomizer"}, 
        React.DOM.input({type: "checkbox", onChange: this.onChange}), 
        React.DOM.i({className: "fa fa-random"})
      )
    );
  }
});

React.renderComponent(
  ControlPad({controlSettings: controlSettings, visible: true}),
  document.getElementById('content')
);

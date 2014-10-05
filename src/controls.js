  /** @jsx React.DOM */

var controlSettings = Circle.settings;

var ControlPad = React.createClass({
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
        <Control settings={controlSettings[i]} key={i} />
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
      <div className={"control-pad " + klass}>
        <i className={"control-toggle fa fa-angle-double-" + icon} onClick={this.toggleView}></i>
        <div className="controls">
          {controlNodes}
          <ColorPicker />
        </div>
      </div>
    );
  }
});

var Control = React.createClass({
  render: function() {
    var settings = this.props.settings,
      property = this.props.key,
      randomToggle,
      pauseToggle;

    if(settings.randomized === undefined) {
      randomToggle = null;
    } else {
      randomToggle = <Randomizer property={property}/>
    }

    if(settings.paused === undefined) {
      pauseToggle = null;
    } else {
      pauseToggle = <Pauser property={property} paused={settings.paused}/>
    }

    return (
      <div className="control">
        <p className="noselect">{settings.name}</p>

        <Slider property={property}
          min={settings.min}
          max={settings.max}
          value={settings.value}/>
        {randomToggle}
        {pauseToggle}
      </div>
    );
  }
});

var Slider = React.createClass({
  onChange: function(e) {
    var props = this.props,
      value = e.target.value;

    props.value = value;
    this.setState(props);

    Circle.set(props.property, value);
  },

  render: function() {
    return (
      <input type="range"
        min={this.props.min}
        max={this.props.max}
        value={this.props.value}
        onChange={this.onChange}/>
    );
  }
});

var Randomizer = React.createClass({
  onChange: function(e) {
    Circle.toggleRandom(this.props.property);
  },

  render: function() {
    return (
      <label className="toggle">
        <input type="checkbox" onChange={this.onChange}/>
        <i className="fa fa-random"></i>
      </label>
    );
  }
});

var Pauser = React.createClass({
  onChange: function(e) {
    var props = this.props;

    props.paused = !props.paused;
    this.setState(props);

    Circle.togglePause(this.props.property);
  },

  render: function() {
    var icon = this.props.paused ? "play" : "pause";

    return (
      <label className="toggle">
        <input type="checkbox"
          checked={this.props.paused}
          onChange={this.onChange}/>
        <i className={"fa fa-" + icon}></i>
      </label>
    );
  }
});

var ColorPicker = React.createClass({
  handleColorSelection: function(e) {
    var value = e.target.value;

    // TODO: create svg styling helper
    Circle.style('svg', {'background-color': value});
  },

  render: function() {
    return (
      <div className="color-picker">
        <p>Background</p>
        <input type="color"
          onChange={this.handleColorSelection}
          defaultValue="#333333" />
      </div>
    );
  }
});

React.renderComponent(
  <ControlPad controlSettings={controlSettings} visible={true} />,
  document.getElementById('content')
);

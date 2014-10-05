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

  render: function() {

    var controlNodes = this.makeControlNodes(this.props.controlSettings),
      klass = this.props.visible ? "show" : "hide",
      iconDirection = this.props.visible ? "left" : "right";

    return (
      <div className={"control-pad " + klass}>
        <i className={"control-toggle fa fa-angle-double-" + iconDirection} onClick={this.toggleView}></i>
        <div className="controls">
          {controlNodes}
        </div>
      </div>
    );
  }
});

var Control = React.createClass({
  render: function() {
    var settings = this.props.settings,
      property = this.props.key,
      randomToggle;

    if(settings.randomized === undefined) {
      randomToggle = null;
    } else {
      randomToggle = <Randomizer property={property}/>
    }

    return (
      <div className="control">
        <p className="noselect">{settings.name}</p>

        <Slider property={property}
          min={settings.min}
          max={settings.max}
          value={settings.value}/>
        {randomToggle}
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
      <label className="randomizer">
        <input type="checkbox" onChange={this.onChange}/>
        <i className="fa fa-random"></i>
      </label>
    );
  }
});

React.renderComponent(
  <ControlPad controlSettings={controlSettings} visible={true} />,
  document.getElementById('content')
);

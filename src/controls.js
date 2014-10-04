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

var ControlPad = React.createClass({
  toggleView: function() {
    var props = this.props;

    props.visible = !props.visible;

    this.setState(props);
  },

  makeControlNodes: function(settings) {
    return this.props.controlSettings.map(function(settings, i) {
      return (
        <Control settings={settings} key={i}/>
      );
    });
  },

  render: function() {

    var controlNodes = this.makeControlNodes(this.props.controlSettings),
      klass = this.props.visible ? "show" : "hide",
      buttonIcon = this.props.visible ? "<<" : ">>";

    return (
      <div className={"control-pad " + klass}>
        <span className="toggle-controls" onClick={this.toggleView}>{buttonIcon}</span>
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
      property = settings.property,
      values = Circle[property],
      randomToggle;

    if(values.randomized === undefined) {
      randomToggle = null;
    } else {
      randomToggle = <Randomizer property={property}/>
    }

    return (
      <div className="control">
        <p>{settings.name}</p>

        <Slider property={property}
          min={values.min}
          max={values.max}
          value={values.value}/>
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
      <div>
        <input type="range"
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.onChange}/>
        <span> {this.props.value}</span>
      </div>
    );
  }
});

var Randomizer = React.createClass({
  onChange: function(e) {
    Circle.toggleRandom(this.props.property);
  },

  render: function() {
    return (
      <div>
        <input type="checkbox" onChange={this.onChange}/>
        <span> randomize</span>
      </div>
    );
  }
});

React.renderComponent(
  <ControlPad controlSettings={controlSettings} visible={true} />,
  document.getElementById('content')
);

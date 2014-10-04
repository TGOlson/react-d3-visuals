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
  }
];

var ControlPad = React.createClass({
  render: function() {
    var controlNodes = this.props.controlSettings.map(function(settings) {
      return (
        <Control settings={settings} />
      );
    });

    return (
      <div className="controls">
        {controlNodes}
      </div>
    );
  }
});

var Control = React.createClass({
  render: function() {
    var settings = this.props.settings
      property = settings.property,
      values = Circle[property];

    return (
      <div className="control">
        <p>{settings.name}</p>

        <Slider property={property}
          min={values.min}
          max={values.max}
          defaultValue={values.value}/>

        <Randomizer property={property}/>
      </div>
    );
  }
});

var Slider = React.createClass({
  onChange: function(e) {
    Circle.set(this.props.property, e.target.value);
  },

  render: function() {
    return (
      <input type="range"
        min={this.props.min}
        max={this.props.max}
        defaultValue={this.props.defaultValue}
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
      <input type="checkbox" onChange={this.onChange}/>
    );
  }
});

React.renderComponent(
  <ControlPad controlSettings={controlSettings}/>,
  document.getElementById('content')
);

import React from "react";

class LightSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lightsOn: true };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.setState(function (prevState) {
      return { lightsOn: !prevState.lightsOn };
    });
  }

  render() {
    return (
      <>
        <button onClick={this.onButtonClick}>
          Turn {this.state.lightsOn ? "off" : "on"}
        </button>
        {!this.state.lightsOn && <Darkness />}
      </>
    );
  }
}

function Darkness(props) {
  return (
    <div style={{
      backgroundColor: "black",
      width: 500,
      height: 500,
    }} />
  );
}

export default LightSwitch;
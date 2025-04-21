import React from "react";

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.updateTime, 1000);
  }

  updateTime() {
    this.setState({ time: new Date() });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <h1>Current time: {this.state.time.toLocaleTimeString()}</h1>
    );
  }
}

export default Watch;
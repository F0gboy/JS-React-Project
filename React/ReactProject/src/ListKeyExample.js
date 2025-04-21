import React from "react";

class ListKeyExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { strings: [] };
    this.onAddStart = this.onAddStart.bind(this);
    this.onAddEnd = this.onAddEnd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  getRandomString() {
    return Math.random().toString(36).substring(2, 5);
  }

  onAddStart() {
    this.setState(prevState => {
      let newString = this.getRandomString();
      return { strings: [newString, ...prevState.strings] };
    });
  }

  onAddEnd() {
    this.setState(prevState => {
      let newString = this.getRandomString();
      return { strings: [...prevState.strings, newString] };
    });
  }

  onRemove(string) {
    this.setState(prevState => {
      let index = prevState.strings.indexOf(string);
      let newStrings = [...prevState.strings];
      newStrings.splice(index, 1);
      return { strings: newStrings };
    });
  }

  render() {
    return (
      <>
        <button onClick={this.onAddStart}>Add to start</button>
        <ListComponent strings={this.state.strings} onRemove={this.onRemove} />
        <button onClick={this.onAddEnd}>Add to end</button>
      </>
    );
  }
}

function ListComponent(props) {
  return (
    <table>
      <tbody>
        {props.strings.map((s, i) =>
          <tr key={i}>
            <td><label>({i}) {s}</label></td>
            <td><input /></td>
            <td><button onClick={() => props.onRemove(s)}>x</button></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ListKeyExample;
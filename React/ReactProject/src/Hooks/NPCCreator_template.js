import React from "react";

class NPCCreatorWithHooks extends React.Component {
  constructor() {
    super();
    this.state = { name: "", faction: "", reputation: "Friendly" }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  }

  render() {
    return (
      <>
        <h3>NPC Creator</h3>
        <NPCForm {...this.state} onChange={this.onChange} />
        <h5>Result:</h5>
        <NameUI {...this.state} />
      </>
    );
  }
}

function NPCForm(props) {
  return (
    <>
      <label>Name:</label>
      <br />
      <input name="name" value={props.name} onChange={props.onChange}></input>
      <br />
      <label>Faction:</label>
      <br />
      <input name="faction" value={props.faction} onChange={props.onChange}></input>
      <br />
      <label>Reputation:</label>
      <br />
      <select name="reputation" value={props.reputation} onChange={props.onChange}>
        <option>Friendly</option>
        <option>Neutral</option>
        <option>Hostile</option>
      </select>
    </>
  );
}

function NameUI(props) {
  function getReputationColor(reputation) {
    if (reputation === "Friendly") return "green";
    if (reputation === "Neutral") return "orange";
    if (reputation === "Hostile") return "Red";
  }

  return (
    <div
      style={{
        width: "250px",
        color: getReputationColor(props.reputation),
        fontWeight: "bolder",
        textAlign: "center"
      }}>
      <div>{props.name}</div>
      <div>{"<" + props.faction + ">"}</div>
    </div>
  );
}

export default NPCCreatorWithHooks;
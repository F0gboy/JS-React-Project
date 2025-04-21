import React from "react";

class PlayerList extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "",
      players: [
        "Mystagogical",
        "Ennui_Pugil",
        "Pugiltan2007",
        "OlerUndern",
        "Undernpea27",
        "Teutomania",
        "Bxx1000Ure",
        "Urega3r",
        "FloroAmerce",
        "Amercedus2003",
      ]
    };
    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSelect(player) {
    this.setState(prevState => {
      return { selected: prevState.selected === player ? "" : player };
    });
  }

  onDelete(player) {
    this.setState(prevState => {
      let playersCopy = [...prevState.players];
      let index = playersCopy.indexOf(player);
      playersCopy.splice(index, 1);
      return { players: playersCopy };
    });
  }

  render() {
    return (
      <>
        <h4>Selected: {this.state.selected}</h4>
        {this.state.players.map(p => {
          return <PlayerRow
            key={p}
            isSelected={this.state.selected === p}
            name={p}
            onSelect={this.onSelect}
            onDelete={this.onDelete} />
        })}
      </>
    );
  }
}

function PlayerRow(props) {
  function onClick() {
    props.onSelect(props.name);
  }

  function onDelete() {
    props.onDelete(props.name);
  }

  return (
    <>
      <div onClick={onClick}>
        {props.isSelected ? <button onClick={onDelete}>x</button> : <></>}
        {props.isSelected ? "--->" : ""} {props.name}
      </div>
    </>
  );
}

export default PlayerList;
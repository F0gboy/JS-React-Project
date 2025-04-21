import React from "react";
import GameAPI from "./GameApi";
import './GameBrowser.css';

class GameBrowser extends React.Component {
  constructor() {
    super();
    let lobbyData = GameAPI.getLobbyData();
    this.state = { lobbyData: lobbyData, selection: "" };
    this.onSelect = this.onSelect.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSelect(id) {
    this.setState({ selection: id });
  }

  onClose() {
    this.setState({ selection: "" });
  }

  render() {
    return (
      this.state.selection === "" ?
        <GameTable
          lobbyData={this.state.lobbyData}
          onSelect={this.onSelect}
        /> :
        <GameDetails
          gameId={this.state.selection}
          onClose={this.onClose}
        />
    );
  }
}

function GameDetails(props) {
  let serverInfo = GameAPI.getServerInfo(props.gameId);

  return (
    <>
      <button onClick={props.onClose}>Close</button>
      <h4>Server info:</h4>
      <table>
        <tbody>
          <tr>
            <td>Server id:</td>
            <td>{serverInfo.id}</td>
          </tr>
          <tr>
            <td>Server name:</td>
            <td>{serverInfo.name}</td>
          </tr>
          <tr>
            <td>Game type:</td>
            <td>{serverInfo.gameType}</td>
          </tr>
          <tr>
            <td>Game version:</td>
            <td>{serverInfo.gameVersion}</td>
          </tr>
          <tr>
            <td>Server type:</td>
            <td>{serverInfo.serverType}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{serverInfo.location}</td>
          </tr>
          <tr>
            <td>Latency:</td>
            <td>{serverInfo.latency}</td>
          </tr>
        </tbody>
      </table>
      <h4>Players ({serverInfo.players.length}/{serverInfo.capacity})</h4>
      {serverInfo.players.map((p, i) => <div>{i + 1} {p}</div>)}
    </>
  );
}

class GameTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sorting: { column: "Name", asc: true } };
    this.onSort = this.onSort.bind(this);
    this.sortGames = this.sortGames.bind(this);
  }

  onSort(sortColumn) {
    this.setState(prevState => {
      let newColumn = prevState.sorting.column !== sortColumn;
      let asc = newColumn ? true : !prevState.sorting.asc;
      return { sorting: { column: sortColumn, asc: asc } };
    });
  }

  sortGames(a, b) {
    let sortVal = 0;
    switch (this.state.sorting.column) {
      case "Name":
        sortVal = a.name.localeCompare(b.name);
        break;
      case "Players":
        sortVal = a.playerCount - b.playerCount;
        break;
      case "Latency":
        sortVal = a.latency - b.latency;
        break;
      case "Type":
        sortVal = a.gameType.localeCompare(b.gameType);
        break;
    }

    return this.state.sorting.asc ? sortVal : sortVal * -1;
  }

  render() {
    return (
      <table className="lobbyTable">
        <thead>
          <tr>
            <GameTableHeader name="Name" onSort={this.onSort} />
            <GameTableHeader name="Players" onSort={this.onSort} />
            <GameTableHeader name="Latency" onSort={this.onSort} />
            <GameTableHeader name="Type" onSort={this.onSort} />
          </tr>
        </thead>
        <tbody>
          {this.props.lobbyData
            .sort(this.sortGames)
            .map(data => <GameTableRow key={data.id} {...data} onSelect={this.props.onSelect} />)}
        </tbody>
      </table>
    );
  }
}

function GameTableHeader(props) {
  function onClick() {
    props.onSort(props.name);
  }

  return (
    <td onClick={onClick}>{props.name}</td>
  );
}

function GameTableRow(props) {
  function getLatencyClass(latency) {
    if (latency <= 30) return "latencyGood";
    if (latency <= 60) return "latencyOk";
    if (latency <= 100) return "latencyBad";
  }

  function onClick() {
    props.onSelect(props.id);
  }

  return (
    <tr onClick={onClick}>
      <td>{props.name}</td>
      <td className="players">{props.playerCount}/{props.capacity}</td>
      <td className={getLatencyClass(props.latency)}>{props.latency}</td>
      <td>{props.gameType}</td>
    </tr>
  );
}

export default GameBrowser;
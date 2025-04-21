import React from "react";

let playerData = {
  avatarUrl: "https://cdn4.iconfinder.com/data/icons/superheroes/512/batman-512.png",
  name: "Alice",
  stats: {
    health: 100,
    strength: 38,
    stamina: 22,
  },
  latestAchievement: "[50 Gnoll kills]",
  lastOnline: new Date()
}

function App() {
  return <PlayerInspector player={playerData} />;
}

function PlayerInspector(props) {
  return (
    <>
      <PlayerProfile name={props.player.name} avatarUrl={props.player.avatarUrl} />
      <PlayerStats stats={props.stats} latestAchievement={props.latestAchievement} />
      <p>
        <i>Last online: <b>{props.player.lastOnline.toDateString()}</b></i>
      </p>
    </>
  );
}

function PlayerProfile(props) {
  return (
    <>
      <img style={{ width: "50px" }} src={props.avatarUrl} />
      <div>{props.name}</div>
    </>
  );
}

function PlayerStats(props) {
  return (
    <>
      <h3>Stats:</h3>
      <ul>
        <li>Health: {props.stats.health}</li>
        <li>Strength: {props.stats.strength}</li>
        <li>Stamina: {props.stats.stamina}</li>
      </ul>
      <b>Latest achievement:</b>
      <div>{props.latestAchievement}</div>
    </>
  );
}


export default App;
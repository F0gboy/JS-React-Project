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
      <img style={{ width: "50px" }} src={props.player.avatarUrl} />
      <div>{props.player.name}</div>
      <h3>Stats:</h3>
      <ul>
        <li>Health: {props.player.stats.health}</li>
        <li>Strength: {props.player.stats.strength}</li>
        <li>Stamina: {props.player.stats.stamina}</li>
      </ul>
      <b>Latest achievement:</b>
      <div>{props.player.latestAchievement}</div>
      <p>
        <i>Last online: <b>{props.player.lastOnline.toDateString()}</b></i>
      </p>
    </>
  );
}


export default App;
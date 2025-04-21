import { countryNames, playerNames, serverNames } from "./names";

let GameAPI = (function () {
  let lobbyList = [];
  let serverList = {};

  for (let i = 0; i < 20; i++) {
    lobbyList.push(generateLobbyData());
  }

  function generateLobbyData() {
    let id = getRandomString();
    let name = getRandomName(serverNames);
    let serverCapacity = getCapacity();
    let latency = getRandomNumber(10, 100);
    let gameType = getGameType();
    
    let serverData = generateServerData(id, name, serverCapacity, latency, gameType);
    serverList[id] = serverData;

    return {
      id: id,
      name: name,
      playerCount: serverData.players.length,
      capacity: serverCapacity,
      latency: latency,
      gameType: gameType
    };
  }

  function getRandomString() {
    return Math.random().toString(36).substring(2, 6);
  }

  function getCapacity() {
    let capacity = getRandomNumber(2, 32);
    return capacity % 2 === 1 ? capacity + 1 : capacity;
  }

  function getGameType() {
    let random = getRandomNumber(0, 2);
    if (random === 0) return "Co-op";
    if (random === 1) return "Team Deathmatch";
    if (random === 2) return "Free For All";
  }

  function generateServerData(id, name, capacity, latency, gameType) {
    return {
      id: id,
      name: name,
      capacity: capacity,
      latency: latency,
      gameType: gameType,
      players: getPlayersArray(capacity),
      gameVersion: "1." + getRandomNumber(10, 15),
      serverType: getRandomNumber(0, 1) === 0 ? "Official" : "Custom",
      location: getRandomName(countryNames)
    };
  }

  function getPlayersArray(maxAmount) {
    let result = [];
    let playerCount = getRandomNumber(0, maxAmount);

    for (let i = 0; i < playerCount; i++) {
      while(true) {
        let randomName = getRandomName(playerNames);
        if (result.includes(randomName))
          continue;
        result.push(randomName);
        break;
      }
    }

    return result;
  }

  function getRandomName(nameArray) {
    let index = getRandomNumber(0, nameArray.length - 1);
    return nameArray[index];
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return {
    getLobbyData: () => [...lobbyList],
    getServerInfo: (id) => serverList[id],
  }
})();

export default GameAPI;
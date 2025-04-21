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
  }
}

export default PlayerList;
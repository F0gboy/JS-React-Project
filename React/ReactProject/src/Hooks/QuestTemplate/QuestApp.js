import React from "react";
import "./quest.css";

function QuestApp() {
  return (
    <>
      <h1>Quest creator</h1>
      <h4>Basic info:</h4>
      <label>Title:</label>
      <input id="title" />
      <label>Description:</label>
      <textarea id="description" />
      <h4>Complete conditions: <i></i></h4>
      <label>Type:</label>
      <select id="type" >
        <option>Gather</option>
        <option>Kill</option>
      </select>
      <label>Amount:</label>
      <input type="number" id="amount" />
      <label>Item/NPC:</label>
      <input id="item" ></input>
      <p><button id="btnCreate">Create quest</button></p>
      <hr />
    </>
  );
}

export default QuestApp
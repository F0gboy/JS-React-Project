import React from "react";

function TopScore(props) {
  return (
    <>
      <h1>First place: {props.first}</h1>
      <h2>Second place: {props.second}</h2>
      <h3>Third place: {props.third}</h3>
    </>
  );
}

export default TopScore;
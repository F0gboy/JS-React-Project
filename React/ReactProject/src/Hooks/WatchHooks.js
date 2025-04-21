import React, { useEffect, useState } from "react";

function WatchHooks(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  });

  function updateTime() {
    setDate(new Date());
  }

  return (
    <h1>Current time: {date.toLocaleTimeString()}</h1>
  );
}

export default WatchHooks;
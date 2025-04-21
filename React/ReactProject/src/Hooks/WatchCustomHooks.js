import React, { useEffect, useState } from "react";

function WatchWithCustomHooks(props) {
  let date = useDate();
  return (
    <h1>Current time: {date.toLocaleTimeString()}</h1>
  );
}

function useDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  });

  function updateTime() {
    setDate(new Date());
  }

  return date;
}

export default WatchWithCustomHooks;
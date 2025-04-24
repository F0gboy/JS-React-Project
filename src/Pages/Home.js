import React from 'react';
import Header from '../Components/Header';
import { useLocation } from 'react-router-dom';
function Home() {
  const location=useLocation();
  const username=location.state?.username|| "Guest";

  return (<div>
    <Header username={username}/>
  </div>);
}

export default Home;

import React from 'react';
import Header from '../Components/Header';
import { useLocation } from 'react-router-dom';
import Post from '../Components/Post';


function Home() {
  const location=useLocation();
  const username=location.state?.username|| "Guest";

  return (<div>
    <Header username={username}/>
  </div>);

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Post />
    </div>
  );
}

}

export default Home;



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import UploadProfilePic from '../Components/UploadProfilePic';

function Profile({ userId, refresh }) {
  const [profilePic, setProfilePic] = useState('');
 

  useEffect(() => {
    if (!userId) return;

    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-profile-pic/${userId}`);
        setProfilePic(response.data.profile_pic);
        console.log("Image src:", `http://localhost:3001/${response.data.profile_pic}`);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
       

      }
    };

    fetchProfilePic();
  }, [userId, refresh]);  // <- include refresh here

  return (
    <div>
      {profilePic ? (
        <img src={`http://localhost:3001/${profilePic}`} alt="Profile" 
        style={{
          width: '170px',
          height: '170px',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '1px solid #ddd',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}
        />
      ) : (
        <p>No profile picture set.</p>
      )}
    </div>
  );
}


function Home() {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const userId = location.state?.userId || null;
  const [refreshPic, setRefreshPic] = useState(false);
  return (
    <div>
     
      <Header username={username}  />
      <Profile userId={userId} refresh={refreshPic} />
      <UploadProfilePic userId={userId} onUploadSuccess={() => setRefreshPic(prev => !prev)} />
    </div>
  );
}

export default Home;




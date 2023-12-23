import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading ,getAccessTokenSilently} = useAuth0();
console.log(user);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const handleFetchData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      // Now you can use the access token to make API requests
      console.log('Access Token:', accessToken);

      // Example: Fetch user-specific data from an API
    //   const response = await fetch('YOUR_API_ENDPOINT', {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });

    //   const data = await response.json();
    //   console.log('API Response:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {!isAuthenticated ? <LoginButton /> : ""}
      {isAuthenticated && (
        <div>
          <div>{user?.name}</div>
          <div>{user?.email}</div>
          <div>{user?.address}</div>
          <div>{user?.phone_number}</div>
          <div>{user?.gender}</div>
          <div>{user?.gender}</div>
          <button onClick={handleFetchData}>Fetch Data</button>
          <LogoutButton/>
        </div>
      )}
    </>
  );
};

export default Profile;

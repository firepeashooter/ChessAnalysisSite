import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/*A function that validates a token by sending it to the backend view "validate token" if the token is 
expired, then it posts to the "refresh token" view to refresh the token and adds the new access token to 
localStorage

Returns True if token is valid and false if not

If the token is expired it will replace access_token in localStorage with the new access token (and then return true)
*/
async function validate_token(token: string | null){

    //Grabs the refresh token for later
    const refresh_token = localStorage.getItem("refresh_token")

    try {
        const response = await fetch('http://127.0.0.1:8000/validate-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Token is valid:', data);
            return true

        } else if (response.status === 401){ //This will happen if the token is just expired
            
            //Refresh the token and if that fails return false

            //Makes call the the backend to refresh the token
            const refreshResponse = await fetch('http://127.0.0.1:8000/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({refresh: refresh_token}),
            });

            if (refreshResponse.ok){
                const data = await refreshResponse.json();
                const newAccessToken = data.access;

                //Save the new access token
                localStorage.setItem('access_token', newAccessToken)

                return true
            }else{
                return false
            }

            
        }else{ //If the token is invalid and not expired return false
            return false
        }
    } catch (error) { //For if it fails to make the call to the backend
        console.error('Error validating token:', error);
        return false
    }


}


//Checks if the user is logged in by validating their token using the above function
function isLoggedIn(){

    const accessToken = localStorage.getItem("access_token")

    if (!accessToken){ 
        console.log("token not found")
        return false
    }

    return validate_token(accessToken)
    
}

//Allows for private pages on the website
const PrivateRoute = () => { 
    
    if (isLoggedIn()){
        return <Outlet /> //Returns children of the parent "Private Route" if the user is logged in 

    }
        
    else{
        return <Navigate to="/login"/>; //Redirects user to the login page if not logged in
    }

};

export default PrivateRoute
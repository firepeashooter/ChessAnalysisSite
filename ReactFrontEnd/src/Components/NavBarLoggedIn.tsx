import React from "react";
import '../CSS/navbar.css'
import { Navigate, useNavigate } from "react-router-dom";



async function handleLogOut() {

    console.log('')

    console.log("Attempting to Logout....")

    

    const url = "http://127.0.0.1:8000/logout" //This is the url for our backend and the specific page we want to post to
    const refresh_token = localStorage.getItem("refresh_token")

    //REFRESHES THE TOKEN IN CASE IT'S EXPIRED
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
    }

    //Grabs the new access_token
    const access_token = localStorage.getItem("access_token")

    //creates a JSON of the tokens to send to the backend
    const token = {
        refresh: refresh_token
    };

        
    //Posts to the backend "/logout" in order to kill the bearer token
    try {
        const response = await fetch(url, {
            method:'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}`},
            body: JSON.stringify(token) //Converts the JSON to a string
                
        });

        console.log(response)
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        //This is what happens when it correctly posts
        console.log('Logout Success');

        // Clear the localStorage to remove the tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        //Navigate to landing page
        window.location.href = "/"

            

    } catch (error){ //This handles any errors that come up when we can't successfuly post
        if (error instanceof Error) {
                console.error('Logout error:', error.message);
        } else {
                console.error('Something went wrong');
        }
        

    }
}



//The Navbar component
const NavbarLoggedIn = () => {
    return(

        <nav className="navbar">
            <div className="navbar-left">

                <a href="/" className="logo">
                    ChessAnalysis
                </a>

            </div>

            <div className="navbar-right">
                <ul className="nav-links">

                    <li> 
                        <a href="/input">
                        Input Games
                        </a>
                    </li>

                    <li> 
                        <button onClick={handleLogOut}>
                        Logout
                        </button>
                    </li>

                   
                    
                    
                </ul>
                
                

                <div className="sub-menu-wrap">
                    <div className="sub-menu"> 
                        <div className="user-info">
                            <h2>Username</h2>

                        </div>
                    
                    </div>


            
                </div>


            </div>

        </nav>



    );

};

export default NavbarLoggedIn
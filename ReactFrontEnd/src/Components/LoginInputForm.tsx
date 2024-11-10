import React, {useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom';









function LoginInputForm(){

    var username = "";
    var password = "";
    const navigate = useNavigate();



    async function handleLogin(username: string, password:string) {

        console.log('')

        console.log("Attempting to Login....")

        const url = "http://127.0.0.1:8000/login" //This is the url for our backend and the specific page we want to post to

        //creates a JSON of the credentials to send to the backend
        const credentials = {
            username, 
            password,
        };


        try {
            const response = await fetch(url, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials) //Converts the JSON to a string
                
            });
            if (!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }

            //This is what happens when it correctly posts
            const json = await response.json();
            console.log('Login Success', json);

            //Store the Access and Refresh tokens in localStorage so we can use them to authenticate the user
            const {access, refresh} = json;

            if (access && refresh){
                localStorage.setItem("access_token", access);
                localStorage.setItem("refresh_token", refresh);
                console.log("tokens saved");

                //Put the user on the logged in home page
            navigate('/home')
            }else{
                throw new Error("Tokens not found in response");
            }

        } catch (error){ //This handles any errors that come up
            if (error instanceof Error) {
                console.error('Login error:', error.message);
            } else {
                console.error('Something went wrong');
            }
        }





    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault(); //This stops the form from refreshing so that it can send info to the backend

        console.log(username)
        console.log(password)

        //Send info to the backend
        handleLogin(username, password)

        


    }

    function handleInputChangeUsername(e : React.ChangeEvent<HTMLInputElement>){
        username = e.target.value
        console.log(username)
    }

    function handleInputChangePassword(e : React.ChangeEvent<HTMLInputElement>){
        password = e.target.value
        console.log(password)
    }




    return(

        

        <div className="Center">

        <div>
            <h1>Login Page</h1>
        </div>


            <form onSubmit={handleOnSubmit}>


                <div>
                <label> Username: </label> 
                <input 
                    type="text" 
                    name="username" 
                    onChange = {handleInputChangeUsername}  
                    
                />
                </div>

                <div>
                <label> Password: </label> 
                <input 
                    type="text" 
                    name="password" 
                    onChange = {handleInputChangePassword}  
                    
                />
                </div>

                <button>Submit</button>

            </form>

        </div>

    )


}


export default LoginInputForm
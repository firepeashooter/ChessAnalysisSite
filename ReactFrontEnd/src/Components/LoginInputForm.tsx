import React, {useState} from "react";









function LoginInputForm(){

    var username = ""
    var password = ""



    async function handleLogin(username: string, password:string) {

        const url = "http://localhost:8000/login" //This is the url for our backend and the specific page we want to post to

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
            console.log('Login Success', json)

        } catch (error){ //This handles any errors that come up
            if (error instanceof Error) {
                console.error('Login error:', error.message);
            } else {
                console.error('Something went wrong');
            }
        }





    }

    function handleOnSubmit() {
        console.log('')
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
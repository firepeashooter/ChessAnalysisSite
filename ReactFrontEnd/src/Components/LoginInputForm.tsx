import React, {useState} from "react";









function LoginInputForm(){

    var username = ""
    var password = ""

    function handleOnSubmit() {
        //Send info to the backend
        console.log(username)
        console.log(password)

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
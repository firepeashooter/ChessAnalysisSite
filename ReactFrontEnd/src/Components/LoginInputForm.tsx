import React, {useState} from "react";









function LoginInputForm(){

    var username = ""
    var password = ""

    function handleOnSubmit() {
        //Send info to the backend

        //fetch(from this url(backend url) with the following information:)
        console.log(username)
        console.log(password)


        //if we get an ok code redirect to the new login page


        //if not show an error page

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
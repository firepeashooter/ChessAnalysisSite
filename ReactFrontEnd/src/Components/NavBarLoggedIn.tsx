import React from "react";
import '../CSS/navbar.css'


//This is a hook? I think it's shorthand for a function
const Navbar = () => {
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
                        <a href="/login">
                        (Username)
                        </a>
                    </li>
                    
                    



                </ul>
                

            </div>


        </nav>



    );

};

export default Navbar
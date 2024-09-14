import React from "react";

function Openings (){
    return(
        <div className="Center">
            <label>Opening: </label>
            <select>
                <option value="Queen's Gambit">Queen's Gambit</option>
                <option value="King's Gambit">King's Gambit</option>
                <option value="Vienna Gambit">Vienna Gambit</option>
            </select>
        </div>
    )

}

export default Openings
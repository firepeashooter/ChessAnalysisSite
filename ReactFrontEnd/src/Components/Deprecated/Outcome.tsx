import React, {useState} from "react";

function LossReason(){
    return (
        <div className="Center">
            <label>Reason for Loss: </label>
            <select>
                <option value="hung_piece">Hung a Piece</option>
                <option value="blundered_endgame">Blundered the Endgame</option>
                <option value="kingside_attack">Kingside Attack</option>
            </select>
        </div>

    )


}

function Outcome(){
    const [outcome, setOutcome]=useState('win');

    return(
        <div>

        <div className ="Sub-title">
            <label> Outcome: </label>
        </div>

        <div className= 'Center'>
        <input type="radio" value="win" name="outcome" onChange={e=>setOutcome(e.target.value)} /> Win
        <input type="radio" value="loss" name="outcome" onChange={e=>setOutcome(e.target.value)} /> Loss
        <input type="radio" value="draw" name="outcome" onChange={e=>setOutcome(e.target.value)} /> Draw
        
        </div>

        <div>
            {outcome == 'loss' && <LossReason/>}

        </div>

        </div>
    )
}

export default Outcome
import React, {useState} from "react";

var loss_reason = "" //Global variable to allow the input form access to the loss reason from the LossReason Function 

function LossReason(){ //Renders the Loss Reason dropdown we need to figure out how to get the loss reason back to the input form

    

    function handleInputChangeLossReason(e : React.ChangeEvent<HTMLSelectElement>){
        loss_reason = e.target.value
        console.log(loss_reason)


    }
    return (
        <div className="Center">
            <label>Reason for Loss: </label>
            <select onChange={handleInputChangeLossReason}>
                <option value="hung_piece">Hung a Piece</option>
                <option value="blundered_endgame">Blundered the Endgame</option>
                <option value="kingside_attack">Kingside Attack</option>
            </select>
        </div>

    )


}

function InputForm(){ //Handles the entire input form

    var accuracy = ""
    var opening = ""
    var notes = ""


    const [outcome, setOutcome]=useState('win');

    function handleInputChangeAccuracy(e : React.ChangeEvent<HTMLInputElement>){
        accuracy = e.target.value
        console.log(accuracy)
    }

    
    function handleInputChangeOpening(e : React.ChangeEvent<HTMLSelectElement>){
        opening = e.target.value
        console.log(opening)
    }

    function handleInputChangeNotes(e : React.ChangeEvent<HTMLInputElement>){
        notes = e.target.value
        console.log(notes)
    }
    

    //Logs all of our variables that are going to be sored in the record (to be sent to a django database)
    function handleOnSubmit(){
        console.log('BUFFER LINE FOR THE CONSOLE') //DELETE THIS LATER
        console.log('Accuracy: ' + accuracy)
        console.log('Opening: ' + opening)
        console.log('Outcome: ' + outcome)
        console.log('Notes: ' + notes)
        console.log('Loss Reason: ' + loss_reason)

        
    }

    
//The accuracy and opening don't take their default value when unchanged
    return(
        <div className="Center">
            <form onSubmit={handleOnSubmit}>


                <div>
                <label> Accuracy: </label> 
                <input 
                    type="text" 
                    name="Accuracy" 
                    onChange = {handleInputChangeAccuracy}  
                    style={{ width:'20px', height: '13px'}}
                />
                </div>


                <div>
                <label>Opening: </label>
                <select defaultValue="" onChange={handleInputChangeOpening} >
                        <option value="" disabled>Select an Opening</option>
                        <option value="Queen's Gambit">Queen's Gambit</option>
                        <option value="King's Gambit">King's Gambit</option>
                        <option value="Vienna Gambit">Vienna Gambit</option>
                </select>
                </div>

                <div>
                <label> Outcome: </label>


                
                <input 
                type="radio" 
                value="win" 
                name="outcome" 
                onChange={e=>setOutcome(e.target.value)} 
                /> Win

                <input 
                type="radio" 
                value="loss" 
                name="outcome" 
                onChange={e=>setOutcome(e.target.value)} 
                /> Loss

                <input 
                type="radio" 
                value="draw" 
                name="outcome" 
                onChange={e=>setOutcome(e.target.value)} 
                /> Draw

                </div>

                {outcome == 'loss' && <LossReason/>} 


                <label>Notes: </label>
                <input 
                type="text" 
                name="Notes"
                onChange={handleInputChangeNotes} 
                style={{ width:'300px', height: '40px', paddingTop: 0, paddingBottom: 0}}
                />
        

                <button>Submit</button>

            </form>

        </div>


    )

}

export default InputForm





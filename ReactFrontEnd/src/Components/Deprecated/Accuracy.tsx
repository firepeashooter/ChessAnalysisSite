import React from "react";




function Accuracy(){

    var accuracy = ""

    function handleInputChange(e : React.ChangeEvent<HTMLInputElement>){
        accuracy = e.target.value
    }

    function handleSubmit(e: React.FormEvent){
        alert('Accuracy:' + accuracy)
    }

    
    return(
        <div className="Center">
            <form>
                <label> Accuracy: </label>
                    <input type="text" name="Accuracy" onChange = {handleInputChange} onSubmit = {handleSubmit} style={{ width:'13px', height: '13px'}}/>

                    <button>
                Submit
                </button>

            </form>

            

            
            
        </div>
        
    )
}

export default Accuracy
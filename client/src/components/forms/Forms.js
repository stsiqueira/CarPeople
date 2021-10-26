
import React, { useState } from "react";
import AddPerson from "./AddPerson";
import AddCar from './AddCar'

const Forms = () => {
    const [editPerson, setEditPerson ] = useState(false)
    const [editCar, setEditCar ] = useState(false)
    const handleEditMode = (option) => {
        switch(option){
            case 'person':
                setEditPerson(!editPerson)
                setEditCar(false)
                break;
            case 'car':
                setEditCar(!editCar)
                setEditPerson(false)
                break;
            default:
                setEditCar(false)
                setEditPerson(false)
                break;
        }
    }
    return (
        <div className="wrapForm">
            <div className="addPerson">
            {
                editPerson ? <AddPerson handleEditMode={handleEditMode}/>
                :
                <button 
                    className='addBtns'
                    onClick={() => handleEditMode('person')}>Add a Person</button>

            }
            </div>
            {
                editCar ? <AddCar handleEditMode={handleEditMode}/>
                :
                <button className="addBtns" onClick={() => handleEditMode('car')}>Add a Car</button>

            }

        </div>
    )
}
export default Forms
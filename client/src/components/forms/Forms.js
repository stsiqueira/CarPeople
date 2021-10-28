
import React, { useState } from "react";
import AddPerson from "./AddPerson";
import AddCar from './AddCar'
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";

const Forms = () => {
    const [editPerson, setEditPerson ] = useState(false)
    const [editCar, setEditCar ] = useState(false)

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

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
                data.people.length ? 
                    editCar ? <AddCar handleEditMode={handleEditMode}/>
                    :
                    <button className="addBtns" onClick={() => handleEditMode('car')}>Add a Car</button>
                :                     
                <button className="addBtns" onClick={()=> window.alert("Please add a person first.")}>Add a car</button>

            }

        </div>
    )
}
export default Forms
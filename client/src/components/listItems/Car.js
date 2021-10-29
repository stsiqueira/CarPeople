import React, { useState} from "react";
import RemoveCar from "../buttons/RemoveCar";
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from "../forms/UpdateCar";

const Car = ( props ) => {
    const [editMode, setEditMode ] = useState(false)
    const priceFormatted = new Intl.NumberFormat('en-CA',{ style: 'currency', currency: 'CAD' }
  ).format(props.price)
  
    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <div className="carContainer">
            {
                editMode ? 
                <UpdateCar 
                    handleEditMode={handleEditMode}
                    data={props}/>
                : 
                <div className="display">
                    <p>Make: {props.make}</p>
                    <p>Model: {props.model}</p>
                    <p>Year: {props.year}</p>
                    <p>Price: {priceFormatted}</p>
                    <div className="buttons">
                        <EditOutlined onClick={handleEditMode} style={{color: 'green'}}/>
                        <RemoveCar data={props} />
                    </div>
                </div>
            }

        </div>
    )
}
export default Car

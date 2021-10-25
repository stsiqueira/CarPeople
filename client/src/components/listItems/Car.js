import React from "react";
import RemoveCar from "../buttons/RemoveCar";

const Car = ( props ) => {

    return (
        <div className="carContainer">
            <p>Make: {props.make}</p>
            <p>Model: {props.model}</p>
            <p>Year: {props.year}</p>
            <p>Price: {props.price}</p>
            <div className="button">
                <RemoveCar data={props} />
            </div>
        </div>
    )
}
export default Car

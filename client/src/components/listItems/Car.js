import React, { useState }from "react";

const getStyles = () => ({
    card:{

    }
})

const Car = ( props ) => {
    const styles = getStyles();

    return (
        <div className="carContainer">
            <p>Make: {props.make}</p>
            <p>Model: {props.model}</p>
            <p>Year: {props.year}</p>
            <p>Price: {props.price}</p>
        </div>
    )
}
export default Car

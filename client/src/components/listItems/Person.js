import React, { useState }from "react";
import CarCards from "../lists/CarCards";

const getStyles = () => ({

})

const Person = ( props ) => {
    const styles = getStyles();
    const [ firstName, setFirstName ] = useState(props.firstName)
    const [ lastName, setLastName ] = useState(props.lastName)

    return (
        <div className="cardContainer">
            <h3>{firstName} {lastName}</h3>
                <CarCards personId={props.id}/>
        </div>
    )
}
export default Person



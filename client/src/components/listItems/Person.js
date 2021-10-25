import { Card } from "antd";
import React, { useState }from "react";
import RemovePerson from "../buttons/RemovePerson";
import CarCards from "../lists/CarCards";


const Person = ( props ) => {
    const [ firstName, setFirstName ] = useState(props.firstName)
    const [ lastName, setLastName ] = useState(props.lastName)

    return (
        <div className="cardContainer">
                <Card
                    
                    actions={[
                        <RemovePerson id={props.id} firstName={firstName} lastName={lastName}  />
                    ]}>
                    {firstName} {lastName}
                </Card>
                <CarCards personId={props.id}/>
        </div>
    )
}
export default Person



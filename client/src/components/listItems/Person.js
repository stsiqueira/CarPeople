import { Card } from "antd";
import React, { useState }from "react";
import RemovePerson from "../buttons/RemovePerson";
import CarCards from "../lists/CarCards";
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from "../forms/UpdatePerson";
import { Link } from "react-router-dom";

const Person = ( props ) => {

    const [editMode, setEditMode ] = useState(false)

    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <div className="cardContainer">
            {
                editMode ? (
                    <UpdatePerson 
                    handleEditMode={handleEditMode}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    id={props.id}
                    />
                ) 
                : (
                    <Card
                        actions={[
                            <EditOutlined 
                            onClick={handleEditMode} 
                            style={{color: 'green'}}/>,
                            <RemovePerson 
                                id={props.id} 
                                firstName={props.firstName} 
                                lastName={props.lastName}  />
                        ]}>
                        {props.firstName} {props.lastName}
                    </Card>
                )
            }
                <CarCards key={props.id} personId={props.id}/>
            <div className="footer">
             <Link to={`/people/${props.id}`}> Learn more</Link>
            </div>
        </div>
    )
}
export default Person



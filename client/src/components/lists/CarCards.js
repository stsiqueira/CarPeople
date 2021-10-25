import React from "react";
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../queries'
import Car from "../listItems/Car";

const CarCards = (props) => {

    const { loading, error, data } = useQuery(GET_CARS)
    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

    return (
        <div className="carsContainer">
        {
            data.cars.filter(( { personId } ) => personId === props.personId )
                .map(( { id, year, make, model, price, personId } ) => (
                    <Car key={id} id={id} year={year} make={make} model={model} price={price} personId={personId}/>
            ))
        }
        </div>
    )
}
export default CarCards

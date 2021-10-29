import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { GET_PEOPLE_WITH_CARS} from "../../queries";

const ShowPage = () =>{
    const  { id } = useParams("id");
    const personWithCarsId = String(id)

    const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS, {
        variables: { personWithCarsId },
    });
    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`
    const { person, car } = data.personWithCars
 

    return (
        <div className="showPageContainer">
            <div className="showPageTitle">
                <h1>ShowPage</h1>
            </div>
            <div className="cardContainer">
                <div className="person">
                    <h2>{person.firstName} {person.lastName}</h2>
                </div>
                <div className="carsContainer">
                {
                    car.map((item) => (
                        <div className="carContainer">
                            <div className="display">
                                <p>Make: {item.make} </p>
                                <p>Model: {item.model}</p>
                                <p>Year: {item.year}</p>
                                <p>Price: {new Intl.NumberFormat('en-CA',{ style: 'currency', currency: 'CAD' }).format(item.price) } </p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className="buttons">
                <Link to='/'> Back to Car and People list</Link>
            </div>
        </div>

    )
}

export default ShowPage
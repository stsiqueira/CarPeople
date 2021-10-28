import React from "react";
import { Link, useParams} from "react-router-dom";

const ShowPage = () =>{
    const {id} = useParams();
    console.log(id)
    return (
        <>
        <h2>ShowPage</h2>
        <Link to='/'> Back to Car and People list</Link>
        </>
    )
}

export default ShowPage
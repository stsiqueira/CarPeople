import React from "react";
import { filter } from 'lodash'
import {DeleteOutlined} from '@ant-design/icons'
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../queries";

const RemoveCar =( { data } )=>{
    let { id, year, make, model, price, personId } = data 
    const [ removeCar ] = useMutation( REMOVE_CAR )
    const deleteCar= () => {
        year = parseInt(year)
        price = parseFloat(price)
        let confirm = window.confirm('Are you sure you want to remove this car?')
        if(confirm){
            removeCar({
                variables:{
                    id
                },
                optimisticResponse:{
                    __typename:'Mutation',
                    removeCar:{
                        __typename:'Car',
                        id,
                        year,
                        make,
                        model,
                        price,
                        personId
                    }
                },
                update:( proxy, { data: { removeCar } } ) => {
                    const { cars } = proxy.readQuery( { query: GET_CARS} )
                    proxy.writeQuery({
                        query: GET_CARS,
                        data: {
                            cars: filter(cars, car => { return car.id !== removeCar.id})
                        }
                    })
                }
            })
        }
    }

    return(
        <DeleteOutlined key='delete' onClick={deleteCar} style={{color: 'red'}}/>
    )
}

export default RemoveCar
import React from "react";
import {DeleteOutlined} from '@ant-design/icons'
import { useMutation, useQuery } from "@apollo/client";
import { GET_CARS, GET_PEOPLE, REMOVE_CAR, REMOVE_PERSON } from "../../queries";
import { filter } from "lodash";


const RemovePerson =({id, firstName, lastName })=>{
    const [ removePerson ] = useMutation( REMOVE_PERSON)
    const [ removeCar ] = useMutation( REMOVE_CAR )
    const { data } = useQuery(GET_CARS)

    const deletePerson = () => {
        let confirm = window.confirm('Are you sure you want to remove this Person?')
        if(confirm){
            removePerson({
                variables:{
                    id
                },
                optimisticResponse:{
                    __typename:'Mutation',
                    removePerson:{
                        __typename:'Person',
                        id,
                        firstName,
                        lastName
                    }
                },
                update:( proxy, { data: { removePerson } } ) => {
                    const { people } = proxy.readQuery({ query: GET_PEOPLE })
                    proxy.writeQuery({
                        query: GET_PEOPLE,
                        data: {
                            people: filter(people, person => {return person.id !== removePerson.id})
                        }
                    })
                }
            })
        }
        const carsToDelete = data.cars.filter((car)=> { return car.personId === id})
        carsToDelete.map(car => deleteCar(car) )
}
    const deleteCar= (car) => {
        const {id, year, make,model, price, personId} = car
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

    return(
        <DeleteOutlined key='delete' onClick={deletePerson} style={{color: 'red'}}/>
    )
}

export default RemovePerson
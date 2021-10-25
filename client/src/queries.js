import { gql } from '@apollo/client'

///////////////////////////////////////////////////////////
////////////        People                    /////////////
///////////////////////////////////////////////////////////
export const GET_PEOPLE = gql`
    {
        people{
            id
            firstName
            lastName
        }
    }
`
export const ADD_PERSON = gql`
mutation
    AddPerson( $id: String!, $firstName: String!, $lastName: String!){
        addPerson( id: $id, firstName: $firstName, lastName:$lastName ){
            id
            firstName
            lastName
        }
    }
`
export const REMOVE_PERSON = gql`
mutation
    RemovePerson( $id: String!, $firstName: String!, $lastName: String!){
        removePerson( id: $id, firstName: $firstName, lastName:$lastName ){
            id
            firstName
            lastName
        }
    }
`

///////////////////////////////////////////////////////////
////////////           Cars                   /////////////
///////////////////////////////////////////////////////////
export const GET_CARS = gql`
    {
        cars{
            id
            year
            make
            model
            price
            personId
        }
    }
`
export const ADD_CAR = gql`
mutation
    AddCar( $id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!){
        addCar( id: $id, year: $year, make: $make, model: $model, price:$price, personId:$personId ){
            id
            year
            make
            model
            price
            personId
        }
    }
`
export const REMOVE_CAR = gql`
mutation
    RemoveCar( $id: String!){
        removeCar( id: $id){
            id
            year
            make
            model
            price
            personId
        }
    }
`
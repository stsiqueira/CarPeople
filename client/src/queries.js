import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
    {
        people{
            id
            firstName
            lastName
        }
    }
`
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
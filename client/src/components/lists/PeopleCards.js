import React from 'react'
import { List } from 'antd'
import Person from '../listItems/Person'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'

const PeopleCards = () => {

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

    return (
        <List 
            grid={ { gutter: 25, column:1 } } >
        {
            data.people.map(( { id, firstName, lastName } ) => (
                <List.Item key={id}>
                    <Person key={id} id={id} firstName={firstName} lastName={lastName}/>
                </List.Item>
            ))
        }

        </List>
    )
}
export default PeopleCards
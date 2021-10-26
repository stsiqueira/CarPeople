import React from 'react'
import { List, Card } from 'antd'
import Person from '../listItems/Person'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'

const PeopleCards = () => {

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

    return (
        // <List grid={{ gutter: 16, column: 4 }} >
        // {
        //     data.people.map(( { id, firstName, lastName } ) => (
        //         <List.Item key={id}>
        //             <Person key={id} id={id} firstName={firstName} lastName={lastName}/>
        //         </List.Item>
        //     ))
        // }

        // </List>
        <List
        grid={{ gutter: 10, column: 2 }}
        itemLayout='horizontal'
        dataSource={data.people}
        renderItem={( { id, firstName, lastName } ) => (
          <List.Item>
            <Card
            style={{borderRadius:'10px',boxShadow: '1px 2px 3px 3px rgba(0,0,0,.4)'}}>
                <Person key={id} id={id} firstName={firstName} lastName={lastName}/>
            </Card>
          </List.Item>
        )}
      />
    )
}
export default PeopleCards
import React, { useState } from "react";
import { Form, Input, Button } from 'antd' 
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
    const [ id ] = useState(uuidv4)
    const [ form ] = Form.useForm()
    const [ addPerson ] = useMutation(ADD_PERSON)

    const onFinish = values => {
        const { firstName, lastName } = values

        addPerson({
            variables:{
                id,
                firstName,
                lastName
            },
            optimisticResponse:{
                __typename:'Mutation',
                addPerson:{
                    __typename:'Person',
                    id,
                    firstName,
                    lastName
                }
            },
            update:(proxy, { data: { addPerson } } ) => {
                const data = proxy.readQuery( { query: GET_PEOPLE } )
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data:{
                        ...data,
                        people: [...data.people, addPerson]
                        
                    }
                })
            }
        })
    }
    return (
        <Form
            form={form}
            name='add-person'
            layout='inline'
            size='large'
            // style={{border:'1px solid red'}}
            onFinish={onFinish}
        >
            <Form.Item
                name='firstName'
                rules={ [ { required: true, message: 'Please insert your first name! ' } ] } >
                <Input placeholder='i.e. John' />
            </Form.Item>
            <Form.Item
                name='lastName'
                rules={ [ { required: true, message: 'Please insert your last name! ' } ] } >
                <Input placeholder='i.e. Hancock' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {()=>(
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter( ( {  errors } ) => errors.length ).length
                        }
                    > Add Person</Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddPerson

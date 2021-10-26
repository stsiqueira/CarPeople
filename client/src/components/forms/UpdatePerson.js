import React, { useState } from "react";
import { Form, Input, Button } from 'antd' 
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = ( props ) => {
    const [ id ] = useState(props.id)
    const [ form ] = Form.useForm()
    const [ updatePerson ] = useMutation(UPDATE_PERSON)

    const onFinish = values => {
        const { firstName, lastName } = values

        updatePerson({
            variables:{
                id,
                firstName,
                lastName
            },
            optimisticResponse:{
                __typename:'Mutation',
                updatePerson:{
                    __typename:'Person',
                    id,
                    firstName,
                    lastName
                }
            }
        })
        props.handleEditMode()
    }
    return (
        <Form
            form={form}
            name='add-person'
            layout='inline'
            size='large'
            // style={{border:'1px solid red'}}
            onFinish={onFinish}
            initialValues={{
                firstName: props.firstName,
                lastName: props.lastName
            }}
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
                    > Confirm</Button>
                )}
            </Form.Item>
            <Button onClick={() => props.handleEditMode()}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson

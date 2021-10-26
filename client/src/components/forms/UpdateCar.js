import React, { useState } from "react";
import { Form, Input, Button, Select } from 'antd'
import { useMutation, useQuery } from "@apollo/client";
import { GET_PEOPLE, UPDATE_CAR, } from "../../queries";


const UpdateCar = ( props ) => {


    const [ form ] = Form.useForm()
    const [ updateCar ] = useMutation(UPDATE_CAR)
    const { loading, error, data } = useQuery(GET_PEOPLE)
    const [ owner ] = useState(data.people.find((person) => { return person.id === props.data.personId } ))
    const [ updatePersonId, setUpdatePersonId] = useState()

    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`
    const { Option } = Select;

    
    const onFinish = values => {
        const { stringYear, make, model, stringPrice } = values
        const id = props.data.id
        let year = parseInt(stringYear)
        let price = parseFloat(stringPrice)
        const personId = updatePersonId

        updateCar({
            variables:{
                id,
                year,
                make,
                model,
                price,
                personId
            },
            optimisticResponse:{
                __typename:'Mutation',
                updateCar:{
                    __typename:'Car',
                        id,
                        year,
                        make,
                        model,
                        price,
                        personId
                }
            }
        })
        props.handleEditMode()
    }
    const handleSelectChange = (id) =>{
        setUpdatePersonId(id)
    }

    return (
        <Form
            form={form}
            name='update-car'
            size='large'
            onFinish={onFinish}
            initialValues={{
                stringYear:props.data.year,
                make:props.data.make,
                model:props.data.model,
                stringPrice:props.data.price,
                stringPersonId:owner ? `${owner.firstName} ${owner.lastName}` : 'Loading...'
            }}

            >
            <Form.Item
                name='stringYear'
                rules={ [ { required: true, message: 'Please insert the year of the car!' } ] } >
                <Input type='number' min='0' placeholder='i.e. 2021'/>
            </Form.Item>
            <Form.Item
                name='make'
                rules={ [ { required: true, message: 'Please insert the make of the car!' } ] } >
                <Input placeholder='i.e. Audi'/>
            </Form.Item>
            <Form.Item
                name='model'
                rules={ [ { required: true, message: 'Please insert the model of the car!' } ] } >
                <Input placeholder='i.e. Q5'/>
            </Form.Item>
            <Form.Item
                name='stringPrice'
                rules={ [ { required: true, message: 'Please insert the price of the car!' } ] } >
                <Input type='number' min='0' placeholder='i.e. 40.000'/>
            </Form.Item>
            <Form.Item
                name='stringPersonId'
                rules={ [ { required: true, message: 'Please insert the personId of the car!' } ] } >
                <Select 
                    style={{ width: 200 }} 
                    onChange={handleSelectChange}
                    >
                        {
                            data.people.map(({id, firstName, lastName}) => (
                                <Option key={id} value={`${id}`}>{firstName} {lastName}</Option>
                            ))
                        }
                </Select>
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
                    > Update</Button>
                )}

            </Form.Item>
            <Button onClick={props.handleEditMode}> Cancel </Button>
        </Form>
    )
}
export default UpdateCar


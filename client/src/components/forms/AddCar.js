import React, { useState } from "react";
import { Form, Input, Button, Select } from 'antd'
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
import { v4 as uuidv4 } from 'uuid'


const AddCar = ( props ) => {
    const { Option } = Select;
    const [ id ] = useState(uuidv4)
    const [ form ] = Form.useForm()
    const [ personId, setPersonId ] = useState()

    const [ addCar ] = useMutation(ADD_CAR)
    const { data } = useQuery(GET_PEOPLE)

    const handleSelectChange = (id) =>{
        setPersonId(id)
    }

    const onFinish = values => {
        const { stringYear, make, model, stringPrice } = values
        const year = parseInt(stringYear)
        const price = parseFloat(stringPrice)
        

        addCar({
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
                addCar:{
                    __typename:'Car',
                        id,
                        year,
                        make,
                        model,
                        price,
                        personId
                }
            },
            update: (proxy, { data: { addCar } } ) => {
                const data = proxy.readQuery( { query: GET_CARS } )
                proxy.writeQuery({
                    query: GET_CARS,
                    data:{
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
        props.handleEditMode()
    }
    return (
        <Form
            form={form}
            name='add-car'
            size='large'
            onFinish={onFinish}
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
                            data.people.map(({id, firstName, lastName})=> (
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
                    > Add Car</Button>
                )}
            </Form.Item>
            <Button onClick={() => props.handleEditMode()}>Cancel</Button>
        </Form>
    )
}
export default AddCar


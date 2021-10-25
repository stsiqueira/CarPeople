import React, { useState } from "react";
import { Form, Input, Button } from 'antd'
import { useMutation } from "@apollo/client";
import { ADD_CAR, GET_CARS } from "../../queries";
import { v4 as uuidv4 } from 'uuid'


const AddCar = () => {
    const [ id ] = useState(uuidv4)
    const [ form ] = Form.useForm()
    const [ addCar ] = useMutation(ADD_CAR)

    const onFinish = values => {
        const { stringYear, make, model, stringPrice, personId } = values
        let year = parseInt(stringYear)
        let price = parseFloat(stringPrice)

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
                name='personId'
                rules={ [ { required: true, message: 'Please insert the personId of the car!' } ] } >
                <Input placeholder='i.e. 1-6'/>
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
        </Form>
    )
}
export default AddCar


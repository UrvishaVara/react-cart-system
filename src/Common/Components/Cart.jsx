import { Button, Input, Modal, TextInput, useSafeMantineTheme } from '@mantine/core';
import React, { use, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const data = [
    { id: 1, name: "Apple AirPods 2", price: "$600", image: "./Images/Image1.png" },
    { id: 2, name: "Samsung Smart Watch", price: "$600", image: "./Images/Image2.png" },
    { id: 3, name: "Apple Monitor Pro", price: "$600", image: "./Images/Image3.png" },
    { id: 4, name: "Apple Watch Series 4", price: "$600", image: "./Images/Image4.png" },
    { id: 5, name: "Google Pixel 4 XL", price: "$600", image: "./Images/Image5.png" },
    { id: 6, name: "Amazon Smart Speaker", price: "$600", image: "./Images/Image6.png" },
    { id: 7, name: "Apple MacBook Pro 16", price: "$600", image: "./Images/Image7.png" },
    { id: 8, name: "Apple iPad 10.2", price: "$600", image: "./Images/Image8.png" },
    { id: 9, name: "SMicrosoft Surface Book", price: "$600", image: "./Images/Image9.png" },
    { id: 10, name: "Google Nest", price: "$600", image: "./Images/Image10.png" },
    { id: 11, name: "Apple iMac Pro ", price: "$600", image: "./Images/Image7.png" },
    { id: 12, name: "Samsung Smart Watch", price: "$600", image: "./Images/Image12.png" },
];

const Cart = () => {

    const [selectData, setSelectData] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState();
    const [cardData, setCardData] = useState(JSON.parse(localStorage.getItem('productData')) || data);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);


    //SelectData
    const selectAll = () => {
        if (selectData.length === data.length) {
            setSelectData([]);
        }
        else {
            setSelectData(data.map((ele) => ele.id))
        }
    }

    useEffect(() => {
        if (selectData.length === data.length) {
            setIsAllSelected(true)
        } else {
            setIsAllSelected(false)
        }
    }, [selectData])

    // handleCheckbox
    const handleCheckedBox = (id) => {
        if (selectData.includes(id)) {
            const filterData = selectData.filter((ele) => ele !== id);
            setSelectData(filterData)
        } else {
            setSelectData([...selectData, id]);
        }
    }
    //handleSearch
    const handleSearch = (value) => {
        const searchFilteredData = data.filter((ele) => ele.name.toLowerCase().includes(value.toLowerCase()))
        setCardData(searchFilteredData);
        setSelectData([])
    }

    //handleDeletebutton
    const handleDelete = () => {
        const updatedData = cardData.filter((ele) => !selectData.includes(ele.id))
        setCardData(updatedData);
    }

    //handleEditbutton
    const handleEditOpen = () => {
        if (selectData.length === 1) { setIsEditing(true) };
        const itemToEdit = cardData.find((ele) => ele.id === selectData[0]);
        setFormData({ id: itemToEdit?.id, image: itemToEdit?.image, name: itemToEdit?.name, price: itemToEdit?.price })
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value })
    }

    const updateFormData = () => {
        const staticData = [...cardData];
        const index = cardData.findIndex((ele) => ele.id === formData?.id);
        staticData.splice(index, 1, formData);
        setCardData(staticData)
        handleModalClose()
        localStorage.setItem("productData", JSON.stringify(staticData));
    }

    const handleAddedOpen = () => {
        setIsAdding(true);
    }

    const handleDataAdd = () => {
        setCardData([...cardData, { ...formData, id: uuidv4() }]);
        setFormData({})
        handleModalClose();
        localStorage.setItem("productData", JSON.stringify([...cardData, { ...formData, id: uuidv4() }]));
    };

    const handleModalClose = () => {
        setIsEditing(false);
        setIsAdding(false);
        setFormData(false)
        setSelectData([]);
    }

    return (
        <>
            <div className='flex justify-between'>
                <Modal opened={isEditing || isAdding} onClose={handleModalClose} title="Edit Product">
                    <div className='space-y-5'>
                        <TextInput value={formData?.image} onChange={handleInputChange} name='image' label="Image" type='string' placeholder='Image' />
                        <TextInput value={formData?.name} onChange={handleInputChange} name='name' label="Product Name" type='string' placeholder='Product Name' />
                        <TextInput value={formData?.price} onChange={handleInputChange} name='price' label="Price" type='string' placeholder='Price' />
                        <div className='grid grid-cols-2 gap-5'>
                            <Button className='!bg-red-500' onClick={handleModalClose}>Cancel</Button>
                            <Button onClick={isAdding ? handleDataAdd : updateFormData}>{isAdding ? 'Add' : "Update"}</Button>
                        </div>
                    </div>
                </Modal>

                <div className='flex gap-2 justify-center items-center'>
                    <input type="checkbox" onClick={selectAll} checked={isAllSelected}></input>
                    <p>Select all</p>
                </div>
                <div className='flex gap-2'>
                    <div className='space-x-1'>
                        <input
                            onChange={(e) => { handleSearch(e.target.value) }}
                            type="text" placeholder="Search product..." className="border p-2 rounded-lg"
                        />
                        <button className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg'>Search</button>
                    </div>
                    <button className={`mt-2  text-white px-4 py-2 rounded-lg ${selectData.length === 1 ? 'bg-green-500' : 'bg-gray-300'}`} onClick={handleEditOpen}>Edit</button>

                    <button onClick={handleDelete} className={`mt-2  text-white px-4 py-2 rounded-lg ${selectData.length ? 'bg-red-500' : 'bg-gray-300'}`}>Delete</button>
                </div>
                <button onClick={handleAddedOpen} className='mt-2 bg-gray-300 text-white px-4 py-2 rounded-lg'>+ Add Product</button>
            </div>
            <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    cardData.map((ele) => {
                        return (
                            <div key={ele.id} className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md">
                                <input type="checkbox" className='mb-3 w-5 h-5 cursor-pointer' onChange={() => { handleCheckedBox(ele.id) }} checked={selectData.includes(ele.id)} />
                                <img src={ele.image} alt='' className="w-40 h-40 object-contain"></img>
                                <p className="mt-4 text-lg font-semibold text-gray-500">{ele.name}</p>
                                <button className='mt-2 bg-gray-300 text-white px-4 py-2 rounded-lg'>{ele.price}</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cart
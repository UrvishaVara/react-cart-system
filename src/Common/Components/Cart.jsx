import React, { useEffect, useState } from 'react'

export const data = [
    { id: 1, name: "Apple AirPods 2", price: "$600", image: "./Images/Image(1).png" },
    { id: 2, name: "Samsung Smart Watch", price: "$600", image: "./Images/Image (13).png" },
    { id: 3, name: "Apple Monitor Pro", price: "$600", image: "./Images/Image (14).png" },
    { id: 4, name: "Apple Watch Series 4", price: "$600", image: "./Images/Image (15).png" },
    { id: 5, name: "Google Pixel 4 XL", price: "$600", image: "./Images/Image (17).png" },
    { id: 6, name: "Amazon Smart Speaker", price: "$600", image: "./Images/Image (16).png" },
    { id: 7, name: "Apple MacBook Pro 16", price: "$600", image: "./Images/Image (18).png" },
    { id: 8, name: "Apple iPad 10.2", price: "$600", image: "./Images/Image (19).png" },
    { id: 9, name: "SMicrosoft Surface Book", price: "$600", image: "./Images/Image 14.png" },
    { id: 10, name: "Google Nest", price: "$600", image: "./Images/Image (17).png" },
    { id: 11, name: "Apple iMac Pro ", price: "$600", image: "./Images/Image(1).png" },
    { id: 12, name: "Samsung Smart Watch", price: "$600", image: "./Images/Image (14).png" },
];

const Cart = () => {
    const [selectData, setSelectData] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [cardData, setCardData] = useState(data);

    const handleSearch = (value) => {
        const searchedFilteredData = data.filter((ele) => ele.name.toLowerCase().includes(value.toLowerCase()))
        setCardData(searchedFilteredData)
    }

    const selectAll = () => {
        if (selectData.length === data.length) {
            setSelectData([]);
        } else {
            setSelectData(data.map((ele) => ele.id));
        }
    }

    const handleCheckBoxChange = (id) => {
        if (selectData.includes(id)) {
            const filteredData = selectData.filter((ele) => ele !== id);
            setSelectData(filteredData);
        } else {
            setSelectData([...selectData, id]);
        }
    }

    //handleDeletebutton
    const handleDelete = () => {
        const updatedData = cardData.filter((ele) => !selectData.includes(ele.id))
        setCardData(updatedData);
    }

    useEffect(() => {
        if (selectData.length === data.length) {
            setIsAllSelected(true);
        } else {
            setIsAllSelected(false);
        }
    }, [selectData]);

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex gap-2 justify-center items-center'>
                    <input type="checkbox" checked={isAllSelected} onClick={selectAll}></input>
                    <p>Select all</p>
                </div>
                <div className='flex gap-2'>
                    <div className='space-x-1'>
                        <input
                            onChange={(e) => { handleSearch(e.target.value) }}
                            type="text" placeholder="Search product..." className="border p-2 rounded-lg"
                        />
                        <button className='mt-2 bg-gray-300 text-white px-4 py-2 rounded-lg'>Search</button>
                    </div>
                    <button onClick={handleDelete} className='mt-2 bg-gray-300 text-white px-4 py-2 rounded-lg'>Edit</button>
                    <button className='mt-2 bg-gray-300 text-white px-4 py-2 rounded-lg'>Delete</button>
                </div>
                <button className='mt-2 bg-gray-300 text-white px-4 py-2 rounded-lg'>+ Add Product</button>
            </div>
            <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    cardData.map((ele) => {
                        return (
                            <div key={ele.id} className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md">
                                <input type="checkbox" onChange={() => { handleCheckBoxChange(ele.id) }} checked={selectData.includes(ele.id)} className='mb-3 w-5 h-5 cursor-pointer' />
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





import React from 'react';
import axios from "axios";

const Modal = ({setModal, data: d}) => {
   console.log(d,d._id)
  
   const token = localStorage.getItem('token')

    const [data, setData]= React.useState({
        expenseType: d.expenseType,
        amount: d.amount,
        date: d.date,
        title: d.title
    })
    const handleChange=(e)=>{
        setData(prev=>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
        
    }
    const handleUpdate = async()=>{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const expenseUpdate = await axios.patch(`/api/v1/expense/${d._id}`,data,config)
        setData(expenseUpdate.data)
        console.log('handleUpdate',expenseUpdate.data)
        
    }
  return (
    <div className='modal'>
        <div className='modal-wrap'>
            <button onClick={()=>setModal(false)}>Close Modal</button>
            <div className='form-group'>
                <label>Expense Type</label>
                <input onChange={handleChange} value={data.expenseType} type="text" name="expenseType" />
            </div>
            <div className='form-group'>
                <label>amount</label>
                <input onChange={handleChange} value={data.amount} type="text" name="amount" />
            </div>
            <div className='form-group'>
                 <label>date</label>
                <input onChange={handleChange} value={data.date} type="text" name="date" />
            </div>
            <div className='form-group'>
                <label>title</label>
                <input onChange={handleChange} value={data.title} type="text" name="title" />
            </div>

            <button onClick={handleUpdate}>Update</button>
        </div>
    </div>
  )
};

export default Modal;

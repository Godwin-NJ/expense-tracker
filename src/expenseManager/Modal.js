import React from 'react';
import axios from "axios";

const Modal = ({setModal,editFormData,setEditFormData, data: d,handleEditFormChangeSam}) => {
   console.log(d,d._id)
   console.log('modaledit',editFormData)
  
   const token = localStorage.getItem('token')
    // sams
    // const [data, setData]= React.useState({
    //     expenseType: d.expenseType,
    //     amount: d.amount,
    //     date: d.date,
    //     title: d.title
    // })
    // sams 
    // const handleChange=(e)=>{
    //     setData(prev=>{
    //         return{
    //             ...prev,
    //             [e.target.name]: e.target.value
    //         }
    //     })
        
    // }
    const handleUpdate = async()=>{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const expenseUpdate = await axios.patch(`/api/v1/expense/${d._id}`,editFormData,config)
        setEditFormData(expenseUpdate.data)
        console.log('handleUpdate',expenseUpdate.data)
    }
  return (
    <div className='modal'>
        <div className='modal-wrap'>
            <button onClick={()=>setModal(false)}>Close Modal</button>
            <div className='form-group'>
                <label>Expense Type</label>
                <input onChange={handleEditFormChangeSam} value={editFormData.expenseType} type="text" name="expenseType" />
            </div>
            <div className='form-group'>
                <label>amount</label>
                <input onChange={handleEditFormChangeSam} value={editFormData.amount} type="text" name="amount" />
            </div>
            <div className='form-group'>
                 <label>date</label>
                <input onChange={handleEditFormChangeSam} value={editFormData.date} type="text" name="date" />
            </div>
            <div className='form-group'>
                <label>title</label>
                <input onChange={handleEditFormChangeSam} value={editFormData.title} type="text" name="title" />
            </div>

            <button onClick={handleUpdate}>Update</button>
        </div>

    </div>
  )
};

export default Modal;

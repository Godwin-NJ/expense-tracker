import React from 'react';

const Modal = ({setModal, data: d}) => {
   console.log(d)

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
    const handleUpdate = ()=>{

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

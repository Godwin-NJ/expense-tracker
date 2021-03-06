import React,{Fragment, useEffect, useState} from 'react'
import axios from "axios";
// import ReadOnlyRow from './readOnlyRow';
// import EditableRow from './EditableRow';
import { useNavigate, } from "react-router-dom";
import Modal from './Modal';
import './displayExpenseData.css'
// import { AiFillBackward } from "react-icons/ai";


const DisplayExpenseData = () => {
    let navigate = useNavigate();
    const[expense, setExpense] = useState([])
    const[modalOpen, setModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null)

    // const[editableContactId, setEditableContactId] = useState(null)

    const[editFormData, setEditFormData] = useState({
        amount:"",
        date: "",
        expenseType:"",
        title:""
    })

    const token = localStorage.getItem('token')

    useEffect(() => {
        //const source = axios.CancelToken.source()
        async function ExpenseJournalEntry(){
            try {
                const response = await axios.get('/api/v1/expense', 
                    {headers : {"Authorization" : `Bearer ${token}`}}
                )
                // console.log('response', response)
                const data = response.data.allExpense
                setExpense(data)
               
            } catch (error) {
                console.log(error)
            }
        }
        ExpenseJournalEntry()
    },[])
    console.log('exp',expense)

    // const handleEditFormChange = (e) => {
    //     e.preventDefault()
    //     const name = e.target.name;
    //     const value = e.target.value
    //     setEditFormData({...editFormData, [name]: value})
    // }
    const handleEditFormChangeSam = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setEditFormData({...editFormData, [name]: value})
    }

    // const handleEditClick = (e,expense) => {
    //     e.preventDefault()
    //     console.log('expense',expense)
    //     // console expense to see what it is
    //     // console.log(expense._id)
    //     setEditableContactId(expense._id)

    //     const EditExistingData = {
    //         amount: expense.amount,
    //         date : expense.date,
    //         expenseType : expense.expenseType,
    //         title : expense.title
    //       }

    //       setEditFormData(EditExistingData)
    // }

    const handleEditClickSam = (expense) => {
        // e.preventDefault()
        // console.log('expense',expense)
        // console expense to see what it is
        // console.log(expense._id)
        setModalOpen(true)
        setCurrentId(expense._id)
        // console.log(expense._id)

        const EditExistingExpense = {
            amount: expense.amount,
            date : expense.date,
            expenseType : expense.expenseType,
            title : expense.title
          }

        //   console.log(EditExistingExpense)

          setEditFormData(EditExistingExpense)
    }
    // console.log(currentId)
   

    // const handleEditFormSubmit = (e) => {
    //     e.preventDefault()
    //     const editExpense = {
    //         _id : editableContactId,
    //         amount:editFormData.amount,
    //         date: editFormData.date,
    //         expenseType:editFormData.expenseType,
    //         title:editFormData.title
    //     }

    //     const newExpense = [...expense]
    //     const index = expense.findIndex((user) =>{
    //         return user._id === editableContactId
    //     })

    //     newExpense[index] = editExpense
    //     setExpense(newExpense)
    //     setEditableContactId(null)

    // }

    // const updateExpense =async (e) => {
    //     e.preventDefault()
    //     const config = {
    //         headers: { Authorization: `Bearer ${token}` }
    //     };

        
    

    //     try {
    //         console.log(editExpense)
    //         const updateExpense =await axios.patch(`/api/v1/expense/${expenseID}`,editExpense, config)
    //         console.log(updateExpense)
    //         setExpense(updateExpense)
    //         setEditableContactId(null)
           
           
    //     } catch (error) {
    //         if(error.respose){
    //             console.log(error)
    //         }
            
    //     }
       
    //   }

    const handleCancelClick = () => {
        setCurrentId(null)
    }

    // const deleteContact = (expenseID) => {
    //     const newExpense = [...expense]
    //     const index = expense.findIndex((user) => user._id === expenseID)
    //     newExpense.splice(index,1)
    //     setExpense(newExpense)
    //   }

      const deleteExpense =async (id) => {
        // const newExpense = [...expense]
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const deleteData = await axios.delete(`/api/v1/expense/${id}`, config)
            setCurrentId(null)
            console.log(deleteData)
            // const data = setExpense(expense => expense !== deleteData)
            // setExpense([...data])
        } catch (error) {
            console.log(error)
        }

       
             
        // const deleteData = expenseData.response
        // setExpense([])
        // console.log(expenseData)

      }

   
    console.log(modalOpen)

    if (expense.length === 0 ) return null 

    return (
    <div className="app-container">
      {/* <form> */}
        <table className='scrollBehaviorTable'>
            <thead>
                <tr>
                    <th>Expense-Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            
            <tbody>
                {expense.map((expenseData) => {
                    const {_id,date, expenseType, title, amount} = expenseData
                    //console.log(expenseData)
                 return (
                
                    <tr key={_id}>
                        <td>{expenseType}</td>
                        <td>{title}</td>
                        <td>{amount}</td>
                        <td>{date}</td>
                        <td >
                            <button 
                                type='button' 
                                className='dataBTN'
                                onClick={() => handleEditClickSam(expenseData)}
                                // onClick={()=>{setModalOpen(true); 
                                //     // setCurrentId(_id)
                                //     // the below is setting currentId as _id 
                                //     handleEditClickSam()
                                // }}
                            >
                                Edit
                            </button>
                            <button 
                                type="button" 
                                className='dataBTN'
                                onClick={() => deleteExpense(_id)}
                            >
                                Delete
                            </button>
                            {(modalOpen === true && currentId ===_id) 
                                && 
                            <Modal 
                                setModal={setModalOpen}  
                                data={expenseData} 
                                handleEditFormChangeSam={handleEditFormChangeSam}
                                editFormData={editFormData}
                                setEditFormData={setEditFormData}
                                setCurrentId={setCurrentId}
                               
                            />}
                        </td>
                    </tr>
               
                
                 )
                })}
            </tbody>
        </table>
        
        {/* <AiFillBackward 
            style={{fontSize:'35px', 
                   position: 'fixed',
                   left: '125px',
                    bottom: '35px'}}
        /> */}
        <button 
            className='rtnExpense' 
            type="button" onClick={() =>navigate('/expense')}
        > 
            Expense Form
        </button>

    </div>
    )
}

export default DisplayExpenseData

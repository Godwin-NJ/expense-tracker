import React,{Fragment, useEffect, useState} from 'react'
import axios from "axios";
import ReadOnlyRow from './readOnlyRow';
import EditableRow from './EditableRow';
import { useNavigate, } from "react-router-dom";
import Modal from './Modal';


const DisplayExpenseData = () => {
    let navigate = useNavigate();
    const[expense, setExpense] = useState([])
    const[modalOpen, setModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0)

    const[editableContactId, setEditableContactId] = useState(null)

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
                console.log('response', response)
                const data = response.data.allExpense
                setExpense(data)
               
            } catch (error) {
                console.log(error)
            }
        }
        ExpenseJournalEntry()
    },[])
    console.log('exp',expense)

    const handleEditFormChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value
        setEditFormData({...editFormData, [name]: value})
    }

    const handleEditClick = (e,expense) => {
        e.preventDefault()
        console.log('expense',expense)
        // console expense to see what it is
        // console.log(expense._id)
        setEditableContactId(expense._id)

        const EditExistingData = {
            amount: expense.amount,
            date : expense.date,
            expenseType : expense.expenseType,
            title : expense.title
          }

          setEditFormData(EditExistingData)
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault()
        const editExpense = {
            _id : editableContactId,
            amount:editFormData.amount,
            date: editFormData.date,
            expenseType:editFormData.expenseType,
            title:editFormData.title
        }

        const newExpense = [...expense]
        const index = expense.findIndex((user) =>{
            return user._id === editableContactId
        })

        newExpense[index] = editExpense
        setExpense(newExpense)
        setEditableContactId(null)

    }

    const updateExpense =async (e) => {
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        

        // const editExpense = {
        //     _id : editableContactId,
        //     amount:editFormData.amount,
        //     date: editFormData.date,
        //     expenseType:editFormData.expenseType,
        //     title:editFormData.title
        // }

        // const newExpense = [...expense]
        // const index = expense.findIndex((user) =>{
        //     return user._id === editableContactId
        // })

        // newExpense[index] = editExpense
    

        try {
            // console.log(editExpense)
            // const updateExpense =await axios.patch(`/api/v1/expense/${expenseID}`,editExpense, config)
            // console.log(updateExpense)
            // setExpense(updateExpense)
            // setEditableContactId(null)
           
           
        } catch (error) {
            if(error.respose){
                console.log(error)
            }
            
        }
       
      }

    const handleCancelClick = () => {
        setEditableContactId(null)
    }

    // const deleteContact = (expenseID) => {
    //     const newExpense = [...expense]
    //     const index = expense.findIndex((user) => user._id === expenseID)
    //     newExpense.splice(index,1)
    //     setExpense(newExpense)
    //   }

      const deleteExpense =async (expenseID) => {
        // const newExpense = [...expense]
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const deleteData = await axios.delete(`/api/v1/expense/${expenseID}`, config)
            
            const data = setExpense(expense => expense !== deleteData)
            setExpense([...data])
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
        <button type="button" onClick={() =>navigate('/expense')}> 
            Return to Expense form
        </button>
      
      {/* <form> */}
        <table>
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
                        <td>
                            <button 
                                type='button' 
                                onClick={()=>{setModalOpen(true); setCurrentId(_id)}}
                            >
                                Edit
                            </button>
                            <button type="submit">Delete</button>
                            {(modalOpen === true && currentId === _id) && <Modal setModal={setModalOpen} data={expenseData} />}
                        </td>
                    </tr>
               
                
                 )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default DisplayExpenseData

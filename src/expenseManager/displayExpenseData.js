import React,{useEffect, useState} from 'react'
import axios from "axios";
import ReadOnlyRow from './readOnlyRow';
import EditableRow from './EditableRow';


const DisplayExpenseData = () => {

    const[expense, setExpense] = useState([])

    const[editableContactId, setEditableContactId] = useState(null)

    const[editFormData, setEditFormData] = useState({
        amount:"",
        date: "",
        expenseType:"",
        title:""
    })

    const token = localStorage.getItem('token')

    useEffect(() => {
        const source = axios.CancelToken.source()
        async function ExpenseJournalEntry(){
            try {
                const response = await axios.get('/api/v1/expense', 
                    {headers : {"Authorization" : `Bearer ${token}`}}
                )
                const data = response.data.allExpense
                setExpense(data)
               
            } catch (error) {
                console.log(error)
            }
        }
        ExpenseJournalEntry()
        
        return () => {
            source.cancel()
        }
    },[token])

    const handleEditFormChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value
        setEditFormData({...editFormData, [name]: value})
    }

    const handleEditClick = (e,expense) => {
        e.preventDefault()
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

    const handleCancelClick = () => {
        setEditableContactId(null)
    }

    const deleteContact = (expenseID) => {
        const newExpense = [...expense]
        const index = expense.findIndex((user) => user._id === expenseID)
        newExpense.splice(index,1)
        setExpense(newExpense)
      }


   
    // console.log(expense)

    if (expense.length === 0 ) return null 

    return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
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
                 return (
                     <React.Fragment key={expenseData._id}>
                         {editableContactId === expenseData._id ?
                            < EditableRow 
                                handleEditFormChange={handleEditFormChange}
                                editFormData={editFormData}
                                handleCancelClick={handleCancelClick}
                            />
                            : 
                            < ReadOnlyRow expense={expenseData} 
                                handleEditClick={handleEditClick}
                                deleteContact={deleteContact}
                            />
                        }
                         
                     </React.Fragment>
                 )
                })}
            </tbody>
        </table>
      </form>  
    </div>
    )
}

export default DisplayExpenseData

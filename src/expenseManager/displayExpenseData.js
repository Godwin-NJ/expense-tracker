import React,{useEffect, useState} from 'react'
import axios from "axios";

const DisplayExpenseData = () => {

    const[expense, setExpense] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function ExpenseJorunalEntry(){
            try {
                const response = await axios.get('/api/v1/expense', 
                    {headers : {"Authorization" : `Bearer ${token}`}}
                )
                const data = response.data.allExpense
                // console.log(data)
                setExpense(data)
                // const data = Object.keys(response.allExpense)
                // console.log(response.data.allExpense)
                // console.log(expense)
               
            } catch (error) {
                console.log(error)
            }
        }
        ExpenseJorunalEntry()
    },[])
    console.log(expense)

    if (expense.length === 0 ) return null 

    return (
        <div>
            {/* {expense.map((data) => {
                return(
                    <div className='expense-data' key={data._id}>
                    </div>
                )
            })} */}
            {/* console.log({expense}) */}
         {/* {expense} */}
            {/* {user.map((person,i) => {
                const{description,name,amount,value='Expense-Type'} = person
                return(
                    <div key={i}>
                        <h2>{description}</h2>
                        <h2>{name}</h2>
                        <h2>{amount}</h2>
                        <h2>{value}</h2>
                    </div>
                )
            })} */}
            <p>Hello world</p>
        </div>
    )
}

export default DisplayExpenseData

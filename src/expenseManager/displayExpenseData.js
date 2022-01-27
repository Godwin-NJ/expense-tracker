import React,{useState} from 'react'

const DisplayExpenseData = ({user}) => {

    return (
        <div>
            {user.map((person,i) => {
                const{description,name,amount,value='Expense-Type'} = person
                return(
                    <div key={i}>
                        <h2>{description}</h2>
                        <h2>{name}</h2>
                        <h2>{amount}</h2>
                        <h2>{value}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default DisplayExpenseData

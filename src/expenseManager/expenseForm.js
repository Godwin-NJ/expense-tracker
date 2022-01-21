
import React,{useState} from 'react'
import ExpenseData from './displayExpenseData'


const ExpenseForm = () => {

    // const [date, setDate] = useState('')
    // const [description, setDescription] = useState('')
    const [category, setCategory] = useState({value :'feeding'})
    // const [amount, setAmount] = useState('')

    const[form, setForm] = useState({
        description : "",
        date : "",
        amount : ""
    })

    const [user,setUser] = useState([])


    function expenseHandleChange(e){
        const name = e.target.name
        const value = e.target.value
        setForm({...form, [name] : value})

    }

   function dropdownChanged(e){
    setCategory({value : e.target.value})
    }
  
    function expenseHandleSubmit(e){
        e.preventDefault()
        if(form.description && form.date && form.amount && category.value){
            const expenseDispatch = 
            {...form,...category, timeStamp : new Date().getTime().toString()}
            setUser([...user,expenseDispatch])  
            setForm({description : "", date : "",amount : ""})
            setCategory({value:""})
        }
    //    return alert('provide information')
        
        
    }

    return (
        <div>
            <h2>Expense</h2>
            <form onSubmit={expenseHandleSubmit}>
                {/* description  */}
                <div>
                    <label htmlFor='description'>Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="description"
                        value={form.description}
                        onChange={expenseHandleChange}
                    />
                </div>

                {/* date  */}
                <div>
                <label htmlFor='date'>Date</label>
                    <input 
                        type="text"
                        name="date"
                        id="date"
                        value={form.date}
                        onChange={expenseHandleChange}
                    />
                </div>
                {/* category  */}
                <div>
                <label htmlFor='category'>Expense Type</label>
                    <select value={category.value} onChange={dropdownChanged}>
                        <option value="office Supplies" >Office Supplies</option>
                        <option value="training" >Education & Training</option>
                        <option value="Feeding" >Feeding</option>
                        <option value="Housing">Housing</option>    
                        <option value="transport">transport</option>    
                    </select>
                    {/* <input type="" id="category"/> */}
                    {/* <input type="" value="submit"/> */}
                </div>

                {/* amount  */}
                <div>
                <label htmlFor='amount'>Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        id="amount"
                        value={form.amount}
                        onChange={expenseHandleChange}
                    />
                </div>

                <input type="submit" value="Submit" />
            </form>

            < ExpenseData user={user}/>

        </div>
    )
}

export default ExpenseForm

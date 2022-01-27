
import React,{useState} from 'react'
import ExpenseData from './displayExpenseData'
import { Navigate,useLocation,Link,useNavigate, } from "react-router-dom";
import './expenseform.css'


const ExpenseForm = () => {
    let navigate = useNavigate();
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

    function logOut(){
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <h2>Expense</h2>
            <form className='expenseForm' onSubmit={expenseHandleSubmit}>
                {/* description  */}
                <div className='inputSingleContainer' style={{marginRight: '41px'}}>
                    <label className='expenseLabel' htmlFor='description'>Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="description"
                        value={form.description}
                        onChange={expenseHandleChange}
                        className='expenseInput'
                    />
                </div>

                {/* date  */}
                <div  className='inputSingleContainer'>
                <label className='expenseLabel' htmlFor='date'>Date</label>
                    <input 
                        type="text"
                        name="date"
                        id="date"
                        value={form.date}
                        onChange={expenseHandleChange}
                        className='expenseInput'
                    />
                </div>
                {/* category  */}
                <div className='inputSingleContainer' style={{marginRight: '47px'}}>
                <label className='expenseLabel' htmlFor='category' >Expense Type</label>
                    <select value={category.value} onChange={dropdownChanged} style={{padding:'5px'}}>
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
                <div className='inputSingleContainer' style={{marginRight: '30px'}}>
                <label className='expenseLabel' htmlFor='amount'>Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        id="amount"
                        value={form.amount}
                        onChange={expenseHandleChange}
                        className='expenseInput'
                    />
                </div>
                <div className='inputSingleContainer'>
                <input type="submit" value="Submit" />
                </div>
               
            </form>

            < ExpenseData user={user}/>
            <button className='btnLogOut' onClick={() => logOut()}>Logout</button>
        </div>
    )
}

export default ExpenseForm

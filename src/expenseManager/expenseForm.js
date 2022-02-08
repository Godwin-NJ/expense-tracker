
import React,{useState} from 'react'
// import ExpenseData from './displayExpenseData'
import { useNavigate, } from "react-router-dom";
import './expenseform.css'
import axios from "axios";


const ExpenseForm = () => {
    let navigate = useNavigate();
    const [category, setCategory] = useState({expenseType :''})
    
    const[form, setForm] = useState({
        title : "",
        date : "",
        amount : "",
    })

    const [user,setUser] = useState({})


    function expenseHandleChange(e){
        const name = e.target.name
        const value = e.target.value
        setForm({...form, [name] : value})
    }

   function dropdownChanged(e){
    setCategory({expenseType : e.target.value})
    }
  
    const expenseHandleSubmit = async (e) =>{
        e.preventDefault()
        // give conditions if required data is not provided 
        if(!(form.title && form.date && form.amount && category.expenseType)){
            console.log('provide data')
            return
        }
        // const expenseDispatch = {...form,...category}
        setUser({...form,...category})
        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
      
        const data = await axios.post('/api/v1/expense',user,config)
        if(!data){
            console.log('error getting expense data')
            return
        }
        setUser(data)
        setForm({title : "", date : "",amount : ""})
        setCategory({expenseType:""})
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
                    <label className='expenseLabel' htmlFor='title'>Description</label>
                    <input 
                        type="text"
                        name="title"
                        id="title"
                        value={form.title}
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
                    <select value={category.expenseType} onChange={dropdownChanged} style={{padding:'5px'}}>
                   
                        <option value="office supplies" >office supplies</option>
                        <option value="Education|training" >Education|training</option>
                        <option value="Feeding" >Feeding</option>
                        <option value="Housing">Housing</option>    
                        <option value="transport">transport</option>    
                     
                    </select>
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

        
                <button onClick={() =>navigate('/expenseJournal')} >
                    {/* <Link to="/expenseJournal" element={user} > */}
                        expense-Journal
                    {/* </Link> */}
                </button>
              
            <button className='btnLogOut' onClick={() => logOut()}>Logout</button>
        </div>
    )
}

export default ExpenseForm

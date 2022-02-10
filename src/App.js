
import ExpenseForm from './expenseManager/expenseForm'
import Login from '../src/userAccess/login'
import DisplayExpenseData from '../src/expenseManager/displayExpenseData'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/expense" element={<ExpenseForm />}/>
        <Route path="/expenseJournal" element={<DisplayExpenseData />} />
      </Routes>
      
    </div>
  );
}

export default App;


import ExpenseForm from './expenseManager/expenseForm'
import Login from '../src/userAccess/login'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/expense" element={<ExpenseForm />} />
      </Routes>
      
    </div>
  );
}

export default App;

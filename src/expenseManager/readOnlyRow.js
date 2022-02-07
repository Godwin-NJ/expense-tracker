import React from 'react';

const readOnlyRow = ({expense,handleEditClick,deleteContact}) => {
    const {_id,amount,date,expenseType,title} = expense;

  return (
      <tr>
            <td>{expenseType}</td>
            <td>{title}</td>
            <td>{amount}</td>
            <td>{date}</td>
            <td>
                <button onClick={(e) => handleEditClick(e,expense)}>Edit</button>
                <button onClick={() => deleteContact(_id)}>Delete</button>
            </td>
      </tr>
  );
};

export default readOnlyRow;

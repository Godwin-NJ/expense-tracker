import React from 'react';

function EditableRow({handleEditFormChange,editFormData,handleCancelClick}) {
  return(
      <tr>
          <td>
              <input 
                type="text"
                required="required"
                placeholder="expense-type"
                name="expenseType"
                value={editFormData.expenseType}
                onChange={handleEditFormChange}
              />
          </td>
          <td>
          <input 
                type="text"
                required="required"
                placeholder="Description"
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
              />
          </td>
          <td>
          <input 
                type="number"
                required="required"
                placeholder="amount"
                name="amount"
                value={editFormData.amount}
                onChange={handleEditFormChange}
              />
          </td>
          <td>
          <input 
                type="text"
                required="required"
                placeholder="date"
                name="date"
                value={editFormData.date}
                onChange={handleEditFormChange}
              />
          </td>
          <td>
          <button type="submit">save</button>
            <button type="submit" onClick={handleCancelClick}>
                Cancel
            </button>
          </td>
      </tr>
  );
}

export default EditableRow;

import React from 'react';
import '../styles/stock.css';
import { Table } from 'react-bootstrap';
import { RiDeleteBin6Fill } from 'react-icons/ri';

function StockManagement({ stockMoment, inputStockMoment, handleOnChangeInput }) {
  return (
    <div className="bingkai-component stockmanagement-component">
      <h3>Stock Management</h3>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Qty Now</th>
              <th>Add Qty</th>
            </tr>
          </thead>
          <tbody>
            {stockMoment.map((stokIn, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{stokIn.name}</td>
                <td>{stokIn.qty}</td>
                <td>
                  <input type="number" value={inputStockMoment[idx]} onChange={handleOnChangeInput} />
                </td>
                <td>
                  <RiDeleteBin6Fill />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <button className="clearstock-button">CLEAR</button>
        <button className="addstock-button">ADD</button>
      </div>
    </div>
  );
}

export default StockManagement;

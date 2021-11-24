import React from 'react';
import '../styles/stock.css';
import { Table } from 'react-bootstrap';

function StockManagement() {
  return (
    <div className="bingkai-component stockmanagement-component">
      <h3>Stock Management</h3>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>U!ty Now</th>
              <th>Add Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>@mdo</td>
              <td>
                <button>-</button>
                <input />
                <button>+</button>
              </td>
            </tr>
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

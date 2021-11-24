import React from 'react';
import '../styles/dashboard.css';
import { Table } from 'react-bootstrap';

function OrderProduct() {
  return (
    <div className="order-bingkai-component">
      <div className="total-cost">
        <h1>Rp. 400.000</h1>
      </div>
      <div className="table-cost">
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>@Price</th>
              <th className="text-center">Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Beras</td>
              <td style={{ color: '#F77F00', fontWeight: '700' }}>Rp.60.000</td>
              <td style={{ color: '#40916C', fontWeight: '700' }}>Rp.30.000</td>
              <td className="text-center">
                <button>-</button>
                <input />
                <button>+</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <hr />
        <h4>Total Cost : Rp. 400.000</h4>
        <hr />
      </div>
      <div className="payment-order">
        <p>CASH : Rp.</p>
        <input />
        <button className="yl-button">CANCEL</button>
        <button className="gr-button">PAY</button>
      </div>
    </div>
  );
}

export default OrderProduct;

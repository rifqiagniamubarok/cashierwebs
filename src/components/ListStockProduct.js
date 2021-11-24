import React from 'react';
import { Table } from 'react-bootstrap';

function ListStockProduct() {
  return (
    <div className="bingkai-component">
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Purchase Price</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>beras</td>
            <td>Rp.20.0000</td>
            <td>Rp.30.0000</td>
            <td>kg</td>
            <td>100</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ListStockProduct;

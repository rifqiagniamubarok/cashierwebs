import React from 'react';
import { Table } from 'react-bootstrap';

function ListCommonProduct() {
  return (
    <div className="bingkai-component">
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Beras</td>
            <td>Rp. 30000</td>
            <td>Kg</td>
            <td>100</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ListCommonProduct;

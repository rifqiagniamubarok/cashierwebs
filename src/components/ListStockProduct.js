import React from 'react';
import { Table } from 'react-bootstrap';

function ListStockProduct({ data, handleInsertStockMoment }) {
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
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product, idx) => (
            <tr key={product.id}>
              <td>{idx + 1}</td>
              <td>{product.name}</td>
              <td>{product.purchase_price}</td>
              <td>{product.price}</td>
              <td>{product.unit}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleInsertStockMoment(idx, product.id, product.name, product.quantity)}>Add Stock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListStockProduct;

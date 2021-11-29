import React from 'react';
import { Table } from 'react-bootstrap';

function ListDashboardProduct({ data, handleValueOrderTake, searchObject, searchObjectBool }) {
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
          {searchObjectBool === true
            ? data.products
                .filter((product) => product.name.includes(`${searchObject}`))
                .map((product, idx) => (
                  <tr key={product.id} style={{ cursor: 'pointer' }} onClick={() => handleValueOrderTake(idx, product.id, product.name, product.purchase_price, product.price, product.unit, product.quantity)}>
                    <td>{idx + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.unit}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
            : data.products.map((product, idx) => (
                <tr key={product.id} style={{ cursor: 'pointer' }} onClick={() => handleValueOrderTake(idx, product.id, product.name, product.purchase_price, product.price, product.unit, product.quantity)}>
                  <td>{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.unit}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListDashboardProduct;

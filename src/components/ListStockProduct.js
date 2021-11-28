import React from 'react';
import { Table } from 'react-bootstrap';

function ListStockProduct({ data, handleInsertValueStockMoment }) {
  // const [valuQtyNew, setValueQtyNew] = useState(1);

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
            <tr key={product.id} onClick={() => handleInsertValueStockMoment(idx, product.id, product.name, product.quantity, product.unit)} style={{ cursor: 'pointer' }}>
              <td>{idx + 1}</td>
              <td>{product.name}</td>
              <td>{product.purchase_price}</td>
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

export default ListStockProduct;

import React from 'react';
import { Table } from 'react-bootstrap';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';

function ListAdminProduct({ data, handleItemEdit, handleDelete, searchObject, searchObjectBool }) {
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
          {searchObjectBool === true
            ? data.products
                .filter((product) => product.name.includes(`${searchObject}`))
                .map((product, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.purchase_price}</td>
                    <td>{product.price}</td>
                    <td>{product.unit}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <FaEdit
                        onClick={() => {
                          handleItemEdit(product.id, product.name, product.purchase_price, product.price, product.unit);
                        }}
                        style={{ cursor: 'pointer', marginRight: '3px' }}
                      />
                      <RiDeleteBin6Fill onClick={() => handleDelete(product.id)} style={{ cursor: 'pointer' }} />
                    </td>
                  </tr>
                ))
            : data.products.map((product, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.purchase_price}</td>
                  <td>{product.price}</td>
                  <td>{product.unit}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <FaEdit
                      onClick={() => {
                        handleItemEdit(product.id, product.name, product.purchase_price, product.price, product.unit);
                      }}
                      style={{ cursor: 'pointer', marginRight: '3px' }}
                    />
                    <RiDeleteBin6Fill onClick={() => handleDelete(product.id)} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
          {/* {data.products.map((product, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{product.name}</td>
              <td>{product.purchase_price}</td>
              <td>{product.price}</td>
              <td>{product.unit}</td>
              <td>{product.quantity}</td>
              <td>
                <FaEdit
                  onClick={() => {
                    handleItemEdit(product.id, product.name, product.purchase_price, product.price, product.unit);
                  }}
                  style={{ cursor: 'pointer', marginRight: '3px' }}
                />
                <RiDeleteBin6Fill onClick={() => handleDelete(product.id)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </div>
  );
}

export default ListAdminProduct;

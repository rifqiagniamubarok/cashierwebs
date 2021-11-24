import React from 'react';
import { Table } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';

const productAdmin = gql`
  query MyQuery {
    products {
      id
      name
      price
      quantity
      unit
      purchase_price
      userProduct {
        id
        company_name
      }
    }
  }
`;
function ListAdminProduct() {
  const { loading, error, data } = useQuery(productAdmin);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
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
          {data.products.map((item, idx) => (
            <tr>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.purchase_price}</td>
              <td>{item.price}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td>
                <FaEdit />
                <RiDeleteBin6Fill />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListAdminProduct;

import React from 'react';
import { Table } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { parseCookies } from 'nookies';

const productCommon = gql`
  query MyQuery($userLoginId: Int!) {
    products(where: { user_id: { _eq: $userLoginId } }, order_by: { name: asc }) {
      id
      name
      price
      quantity
      unit
      userProduct {
        company_name
        username
      }
    }
  }
`;

function ListDashboardProduct() {
  const cookies = parseCookies();
  const { loading, error, data } = useQuery(productCommon, { variables: { userLoginId: cookies.id } });
  console.log(cookies);
  console.log(cookies.id);
  console.log(cookies.name);

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

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
          {data.products.map((product, idx) => (
            <tr key={product.id}>
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

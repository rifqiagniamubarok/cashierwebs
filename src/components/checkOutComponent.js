import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

function CheckOutComponent({ data }) {
  return (
    <Col xs={7} className="bingkai-component">
      <h1>{data.users[0].company_name}</h1>
      <h6>by </h6>
      <h4>Cashier Web</h4>
      <Row>
        <Col xs={12}>
          <Table className="table-borderless">
            <thead>
              <tr>
                <th>NO</th>
                <th>Name</th>
                <th>@Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.orders[0].orderDetails.map((product, ind) => (
                <tr>
                  <td>{ind + 1}</td>
                  <td>{product.getProduct.name}</td>
                  <td>Rp. {product.getProduct.price}</td>
                  <td>
                    {product.quantity} {product.getProduct.unit}
                  </td>
                  <td>Rp. {product.total_cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={9}>
          <p className="text-end">TOTAL COST</p>
        </Col>
        <Col>
          <p className="text-start">Rp. {data.orders[0].total_cost}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={9}>
          <p className="text-end">CASH</p>
        </Col>
        <Col>
          <p className="text-start">Rp. {data.orders[0].total_pay}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={9}>
          <p className="text-end">CHANGE</p>
        </Col>
        <Col>
          <p className="text-start">Rp. {data.orders[0].total_pay - data.orders[0].total_cost}</p>
        </Col>
      </Row>
    </Col>
  );
}

export default CheckOutComponent;

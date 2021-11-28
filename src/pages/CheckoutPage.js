import React from 'react';
import '../styles/checkout.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ImPrinter } from 'react-icons/im';
import { GrDocumentPdf } from 'react-icons/gr';
import { parseCookies } from 'nookies';
import { gql, useQuery } from '@apollo/client';

const readChekoutOrders = gql`
  query MyQuery($idc: Int!, $idv: Int!) {
    orders(where: { id: { _eq: $idc } }) {
      orderDetails {
        getProduct {
          name
          price
          unit
        }
        quantity
        total_cost
      }
      total_cost
      total_pay
      createdAt
    }
    users(where: { id: { _eq: $idv } }) {
      company_name
    }
  }
`;

function CheckoutPage() {
  const cookies = parseCookies();
  let params = useParams();

  const { loading, error, data } = useQuery(readChekoutOrders, {
    variables: {
      idc: params.id,
      idv: cookies.id,
    },
  });
  // const [countPage, setCountPage] = useState(0);
  const navigate = useNavigate();

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  console.log(data.orders[0].orderDetails);
  return (
    <div className="checkout-page">
      <Container>
        <Row className="justify-content-md-center checkout-card">
          <Col xs={7} className="bingkai-component">
            <h1>{data.users[0].company_name}</h1>
            <h6>by {params.id}</h6>
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
                          `{product.quantity} {product.getProduct.unit}`
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
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={7} className="text-end">
            <button onClick={() => navigate('/dashboards')} style={{ background: '#ff9d0b', color: 'white', fontWeight: 'border' }}>
              back
            </button>
            <button>
              <GrDocumentPdf />
            </button>
            <button>
              <ImPrinter />
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckoutPage;

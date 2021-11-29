import React from 'react';
import '../styles/checkout.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ImPrinter } from 'react-icons/im';
import { GrDocumentPdf } from 'react-icons/gr';
import { parseCookies } from 'nookies';
import { gql, useQuery } from '@apollo/client';
import CheckOutComponent from '../components/CheckOutComponent';

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
  // const [dataOrderX, setDataOrderX] = useState([]);

  const { loading, error, data } = useQuery(readChekoutOrders, {
    // onCompleted: (data) => {
    //   setDataOrderX(data);
    // },
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
          <CheckOutComponent data={data} />
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

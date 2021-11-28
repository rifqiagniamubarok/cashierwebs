import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ListDashboardProduct from '../components/ListDashboardProduct';
import NavbarComponent from '../components/NavbarComponent';
import OrderProduct from '../components/OrderProduct';
import SearchDashboard from '../components/SearchDashboard';
import { parseCookies } from 'nookies';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const cookies = parseCookies();
  const navigate = useNavigate();
  const [valueOrderName, setValueOrderName] = useState('');
  const [valueOrderPrice, setValueOrderPrice] = useState(0);
  const [valueOrderQty, setValueOrderQty] = useState(0);

  useEffect(() => {
    if (cookies.id === undefined) {
      navigate('/');
    }
  });
  console.log(cookies);
  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={7}>
            <c0l>
              <SearchDashboard />
            </c0l>
            <Col>
              <ListDashboardProduct />
            </Col>
          </Col>
          <Col>
            <OrderProduct />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardPage;

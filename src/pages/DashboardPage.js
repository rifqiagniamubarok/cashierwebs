import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ListCommonProduct from '../components/ListCommonProduct';
import NavbarComponent from '../components/NavbarComponent';
import OrderProduct from '../components/OrderProduct';
import SearchDashboard from '../components/SearchDashboard';

function DashboardPage() {
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
              <ListCommonProduct />
            </Col>
          </Col>
          <Col xs={5}>
            <OrderProduct />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardPage;

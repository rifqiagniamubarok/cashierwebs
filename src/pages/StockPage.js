import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col } from 'react-bootstrap';
import ListStockProduct from '../components/ListStockProduct';
import StockManagement from '../components/StockManagement';
import SearchStock from '../components/SearchStock';

function StockPage() {
  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={8}>
            <Col>
              <SearchStock />
            </Col>
            <Col>
              <ListStockProduct />
            </Col>
          </Col>
          <Col>
            <StockManagement />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StockPage;

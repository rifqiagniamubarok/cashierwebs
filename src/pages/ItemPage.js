import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col } from 'react-bootstrap';
import ListAdminProduct from '../components/ListAdminProduct';
import ItemManagement from '../components/ItemManagement';
import SearchItem from '../components/SearchItem';

function ItemPage() {
  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={8}>
            <Col>
              <SearchItem />
            </Col>
            <Col>
              <ListAdminProduct />
            </Col>
          </Col>
          <Col>
            <h2>
              <ItemManagement />
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ItemPage;

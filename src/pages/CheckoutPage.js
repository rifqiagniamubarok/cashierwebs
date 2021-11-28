import React from 'react';
import '../styles/checkout.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const navigate = useNavigate();
  return (
    <div className="checkout-page">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={7} style={{ background: 'red' }}>
            <h1>cek</h1>
            <Row>
              <Col xs={8} style={{ background: 'blue' }}>
                <p>jsahdj</p>
              </Col>
              <Col style={{ background: 'yellow' }}>
                <p>jsahdj</p>
                <p>jsahdj</p>
                <p>jsahdj</p>
                <p>jsahdj</p>
                <p>jsahdj</p>
              </Col>
            </Row>
            <Row>
              <p>jdsfhdjk</p>
            </Row>
            <Row>
              <Col xs={8} style={{ background: 'blue' }}>
                <p>jsahdj</p>
              </Col>
              <Col style={{ background: 'yellow' }}>
                <p>jsahdj</p>
                <p>jsahdj</p>
              </Col>
            </Row>
            <Row>
              <p>jdsfhdjk</p>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
          <Col xs={7} style={{ background: 'orange' }}>
            <p>jshdsadsj</p>
            <button onClick={() => navigate('/dashboards')}>back</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckoutPage;

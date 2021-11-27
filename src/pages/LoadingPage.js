import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/loading.css';

function LoadingPage() {
  return (
    <div className="loading-page">
      <Container>
        <Row>
          <h1>Cashier Web</h1>
        </Row>
      </Container>
    </div>
  );
}

export default LoadingPage;

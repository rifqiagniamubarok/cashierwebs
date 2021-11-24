import React from 'react';
import { Row, Container } from 'react-bootstrap';
import gambar404 from '../404.svg';
import '../styles/notfound.css';

function NotFoundPage() {
  return (
    <div className="notfound-page">
      <Container>
        <Row className="justify-content-md-center">
          <img src={gambar404} className="notfound-image" alt="404" />
          <h1>Ups, Page not found</h1>
        </Row>
      </Container>
    </div>
  );
}

export default NotFoundPage;

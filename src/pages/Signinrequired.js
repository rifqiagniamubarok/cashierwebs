import React from 'react';
import { Row, Container } from 'react-bootstrap';
import gambarlock from '../lock.svg';
import '../styles/notfound.css';

function Signinrequired() {
  return (
    <div className="notfound-page">
      <Container>
        <Row className="justify-content-md-center">
          <img src={gambarlock} className="notfound-image" alt="404" />
          <h1>Ups, Sign In Required</h1>
          <a href="/">Click Here to Sign In</a>
        </Row>
      </Container>
    </div>
  );
}

export default Signinrequired;

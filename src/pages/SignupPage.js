import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/signup.css';

function SignupPage() {
  return (
    <div className="signup-page">
      <Container>
        <Row>
          <h1>Cashier Web</h1>
        </Row>
        <Row className="justify-content-md-center">
          <form>
            <h2>Sing Up</h2>
            <p>Create Ur Own Cashier Web Account</p>
            <input type="text" placeholder="Enter Company Name" />
            <input type="text" placeholder="Enter Username" />
            <input type="text" placeholder="Enter Password" />
            <button type="submit">Next</button>
            <a href="/">back</a>
          </form>
        </Row>
      </Container>
    </div>
  );
}

export default SignupPage;

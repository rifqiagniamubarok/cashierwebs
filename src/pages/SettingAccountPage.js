import React from 'react';
import '../styles/setting.css';
import NavbarComponent from '../components/NavbarComponent';
import gambarsampul from '../ilutrasi/sampul.svg';
import { Container, Col, Row } from 'react-bootstrap';
// import { FaEdit } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';

function SettingAccountPage() {
  return (
    <div className="setting-page">
      <NavbarComponent />
      <Container>
        <Row className="justify-content-md-center checkout-card">
          <Col xs={8} className="bingkai-component">
            <img src={gambarsampul} alt="sampulImg" className="sampul-img" />
            <h1>Account Setting</h1>
            <div className="setting-box">
              <h3>Company Name :</h3>
              <h2>
                TOKO PERMATA{' '}
                <span>
                  <AiTwotoneEdit />
                </span>
              </h2>

              <h3>Username :</h3>
              <h2>
                ADMIN PERMATA{' '}
                <span>
                  <AiTwotoneEdit />
                </span>
              </h2>
              <h3>Password</h3>
              <h2>
                *********{' '}
                <span>
                  <AiTwotoneEdit />
                </span>
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SettingAccountPage;

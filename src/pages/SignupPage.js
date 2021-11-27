import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/signup.css';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';

const insertUser = gql`
  mutation MyMutation($object: users_insert_input!) {
    insert_users_one(object: $object) {
      username
    }
  }
`;

function SignupPage() {
  const [insertUserReg] = useMutation(insertUser);
  const [companyNameReg, setCompanyNameReg] = useState('');
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const navigate = useNavigate();

  // if (loading) return <LoadingPage />;

  const handleChangeCompany = (e) => {
    setCompanyNameReg(e.target.value);
  };
  const handleChangeUsername = (e) => {
    setUsernameReg(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordReg(e.target.value);
  };

  const handleSubmit = (e) => {
    insertUserReg({
      variables: {
        object: {
          company_name: companyNameReg,
          username: usernameReg,
          password: passwordReg,
        },
      },
    });
    swal('Success!', 'succes to create account', 'success');
    navigate('/');
  };

  return (
    <div className="signup-page">
      <Container>
        <Row>
          <h1>Cashier Web</h1>
        </Row>
        <Row className="justify-content-md-center">
          <form onSubmit={handleSubmit}>
            <h2>Sing Up</h2>
            <p>Create Ur Own Cashier Web Account</p>
            <input type="text" placeholder="Enter Company Name" value={companyNameReg} onChange={handleChangeCompany} />
            <input type="text" placeholder="Enter Username" value={usernameReg} onChange={handleChangeUsername} />
            <input type="password" placeholder="Enter Password" value={passwordReg} onChange={handleChangePassword} />
            <button type="submit">Next</button>
            <a href="/">back</a>
          </form>
        </Row>
      </Container>
    </div>
  );
}

export default SignupPage;

import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/signin.css';
import { gql, useQuery } from '@apollo/client';
import LoadingPage from './LoadingPage';

const userAccount = gql`
  query MyQuery {
    users {
      id
      password
      company_name
      username
    }
  }
`;

function SigninPage() {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [unregistered, setUnregistered] = useState(true);
  const { loading, error, data } = useQuery(userAccount);

  if (loading) return <LoadingPage />;
  if (error) return `Error! ${error.message}`;

  const handleChangeUsername = (e) => {
    setUsernameLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordLogin(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    data.users.map((item) => {
      if (item.username === usernameLogin && item.password === passwordLogin) {
        console.log('sukse');
      } else {
        setUnregistered(false);
      }
    });
  };

  return (
    <div className="signin-page" onSubmit={handelSubmit}>
      <Container>
        <Row>
          <h1>Cashier Web</h1>
        </Row>
        <Row className="justify-content-md-center">
          <form>
            <h2>Sing In</h2>
            <input type="text" placeholder="Enter Username" value={usernameLogin} onChange={handleChangeUsername} />
            <input type="password" placeholder="Enter Password" value={passwordLogin} onChange={handleChangePassword} />
            <p>{unregistered ? '' : "username or password that you've entered is incorrect"}</p>
            <button type="submit">Next</button>
            <a href="/signup">Sign Up</a>
          </form>
        </Row>
      </Container>
    </div>
  );
}

export default SigninPage;

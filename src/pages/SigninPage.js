import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/signin.css';
import { gql, useLazyQuery } from '@apollo/client';
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'nookies';

const userAccount = gql`
  query MyQuery($username: bpchar!, $pass: bpchar!) {
    users(where: { username: { _eq: $username }, password: { _eq: $pass } }) {
      id
      company_name
    }
  }
`;

function SigninPage() {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [unregistered, setUnregistered] = useState(true);
  const [getLogin, { loading, error }] = useLazyQuery(userAccount, {
    onCompleted: (data) => {
      setCookie(null, 'id', data.users[0].id);
      setCookie(null, 'name', data.users[0].company_name);
      navigate('/dashboards');
      // console.log(data);
    },
  });
  const navigate = useNavigate();
  // const cookies = parseCookies();

  // useEffect(() => {
  //   if (cookies.id !== undefined) {
  //     navigate('/dashboards');
  //   }
  // });

  if (loading) return <LoadingPage />;
  if (error) return `Error! ${error} ${setUnregistered(false)}`;

  const handleChangeUsername = (e) => {
    setUsernameLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordLogin(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    getLogin({
      variables: {
        username: usernameLogin,
        pass: passwordLogin,
      },
    });
    // data.users.map((item) => {
    //   if (item.username === usernameLogin && item.password === passwordLogin) {
    //     setCookie(null, 'id', item.id);
    //     setCookie(null, 'name', item.company_name);
    //     navigate('/dashboards');
    //   } else {
    //     // .
    //     setUnregistered(false);
    //   }
    // });
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

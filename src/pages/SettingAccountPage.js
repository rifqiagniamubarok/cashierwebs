import React, { useState } from 'react';
import '../styles/setting.css';
import NavbarComponent from '../components/NavbarComponent';
import gambarsampul from '../ilutrasi/sampul.svg';
import { Container, Col, Row } from 'react-bootstrap';
import { parseCookies, setCookie } from 'nookies';

// import { FaEdit } from 'react-icons/fa';
// import { AiTwotoneEdit } from 'react-icons/ai';
import swal from 'sweetalert';
import { gql, useQuery, useMutation } from '@apollo/client';

const userAccount = gql`
  query MyQuery($idUser: Int!) {
    users(where: { id: { _eq: $idUser } }) {
      id
      company_name
      username
      password
    }
  }
`;

const updateDataUserAccounts = gql`
  mutation MyMutation($id: Int!, $company_name: bpchar!, $username: bpchar = "", $password: bpchar!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { company_name: $company_name, username: $username, password: $password }) {
      id
    }
  }
`;

function SettingAccountPage() {
  const cookies = parseCookies();
  const { loading, error, data } = useQuery(userAccount, { variables: { idUser: cookies.id } });
  const [updateDataUserAccount] = useMutation(updateDataUserAccounts, { refetchQueries: [userAccount] });

  const [editBool, setEditBool] = useState(false);
  const [companyNameNew, setCompanyNameNew] = useState('');
  const [usernameNew, setUsernameNew] = useState('');
  const [passwordNew, setPasswordNew] = useState('');

  const handleCompanyNameNew = (e) => {
    setCompanyNameNew(e.target.value);
  };
  const handleUsernameNew = (e) => {
    setUsernameNew(e.target.value);
  };
  const handlePasswordNew = (e) => {
    setPasswordNew(e.target.value);
  };

  const handkeEditBool = () => {
    setEditBool(!editBool);
    if (editBool === false) {
      setCompanyNameNew(data.users[0].company_name);
      setUsernameNew(data.users[0].username);
    } else {
      setCompanyNameNew('');
      setUsernameNew('');
      setPasswordNew('');
    }
  };

  const handleSettingData = (e) => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'Are U sure to change ur own account data',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Your own account data has been edited', {
          icon: 'success',
        });
        updateDataUserAccount({
          variables: {
            id: cookies.id,
            company_name: companyNameNew,
            username: usernameNew,
            password: passwordNew,
          },
        });
        setCookie(null, 'name', companyNameNew);
        setEditBool(false);
      } else {
        swal('Your account data is safe!');
      }
    });
  };

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="setting-page">
      <NavbarComponent />
      <Container>
        <Row className="justify-content-md-center checkout-card">
          <Col xs={8} className="bingkai-component">
            <img src={gambarsampul} alt="sampulImg" className="sampul-img" />
            <h1>Account Setting</h1>
            <div className="button-setting">
              <button onClick={handkeEditBool}>{editBool === true ? 'Back' : 'Edit Data'}</button>
            </div>
            {editBool === true ? (
              <div className="setting-box">
                <form onSubmit={handleSettingData}>
                  <h3>Company Name :</h3>
                  <h2>
                    <input value={companyNameNew} onChange={handleCompanyNameNew} required />
                  </h2>

                  <h3>Username :</h3>
                  <h2>
                    <input value={usernameNew} onChange={handleUsernameNew} required />
                  </h2>
                  <h3>Password</h3>
                  <h2>
                    <input value={passwordNew} onChange={handlePasswordNew} type="password" required />
                  </h2>
                  <button onClick={handkeEditBool}>Cancel</button>
                  <button type="submit">Save</button>
                </form>
              </div>
            ) : (
              <div className="setting-box">
                <h3>Company Name :</h3>
                <h2>{data.users[0].company_name}</h2>

                <h3>Username :</h3>
                <h2>{data.users[0].username}</h2>
                <h3>Password</h3>
                <h2>*********</h2>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SettingAccountPage;

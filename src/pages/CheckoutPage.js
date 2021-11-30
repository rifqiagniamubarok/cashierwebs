import React from 'react';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { ImPrinter } from 'react-icons/im';
import { IoIosArrowBack } from 'react-icons/io';
import { parseCookies } from 'nookies';
import { gql, useQuery } from '@apollo/client';
import CheckOutComponent from '../components/CheckOutComponent';

const readChekoutOrders = gql`
  query MyQuery($idc: Int!, $idv: Int!, $idk: Int!) {
    orders(where: { id: { _eq: $idc } }) {
      total_cost
      total_pay
      createdAt
    }
    order_details(where: { order_id: { _eq: $idk } }) {
      id
      getProduct {
        name
        price
        purchase_price
        quantity
        unit
      }
      quantity
      total_cost
    }
    users(where: { id: { _eq: $idv } }) {
      company_name
    }
  }
`;

function CheckoutPage() {
  const cookies = parseCookies();

  const { loading, error, data } = useQuery(readChekoutOrders, {
    variables: {
      idc: cookies.checkout,
      idv: cookies.id,
      idk: cookies.checkout,
    },
  });

  const navigate = useNavigate();

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="checkout-page">
      <div>
        <div className="justify-content-md-center checkout-card">
          <CheckOutComponent data={data} />
        </div>
        <div className="justify-content-md-center">
          <div xs={7} className="text-center">
            <button onClick={() => navigate('/dashboards')} style={{ background: '#ff9d0b', divor: 'white', fontWeight: 'border' }}>
              <IoIosArrowBack />
            </button>
            <button onClick={() => window.print()}>
              <ImPrinter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

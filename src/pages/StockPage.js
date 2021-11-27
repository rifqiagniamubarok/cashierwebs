import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col } from 'react-bootstrap';
import ListStockProduct from '../components/ListStockProduct';
import StockManagement from '../components/StockManagement';
import SearchStock from '../components/SearchStock';
import { parseCookies } from 'nookies';
import { gql, useQuery } from '@apollo/client';

const productStocks = gql`
  query MyQuerys($userLoginId: Int!) {
    products(where: { user_id: { _eq: $userLoginId } }) {
      id
      name
      price
      quantity
      unit
      purchase_price
      userProduct {
        username
        company_name
      }
    }
    stock_ins {
      stock_in_details_id {
        id
        qty
        productIn {
          name
        }
      }
    }
  }
`;

const StockMoments = [];
const inputStockMoments = [0, 0];
function StockPage() {
  const cookies = parseCookies();
  const { loading, error, data } = useQuery(productStocks, {
    variables: {
      userLoginId: cookies.id,
    },
  });

  const [stockMoment, setStockMoment] = useState(StockMoments);
  const [inputStockMoment, setInputStockMoment] = useState(inputStockMoments);

  const handleOnChangeInput = (e) => {
    setInputStockMoment(e.target.value);
  };

  const handleInsertStockMoment = (idx, idtake, nametake, qtytake) => {
    setStockMoment((prev) => [
      ...prev,
      {
        id: idtake,
        name: nametake,
        qty: qtytake,
        qtyadd: inputStockMoment[idx],
      },
    ]);
    setInputStockMoment((prev) => [...prev, 0]);
  };

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  console.log(stockMoment);
  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={8}>
            <Col>
              <SearchStock />
            </Col>
            <Col>
              <ListStockProduct data={data} handleInsertStockMoment={handleInsertStockMoment} />
            </Col>
          </Col>
          <Col>
            <StockManagement stockMoment={stockMoment} inputStockMoment={inputStockMoment} handleOnChangeInput={handleOnChangeInput} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StockPage;
// onClick={() => handleIdRooms(product.id)}

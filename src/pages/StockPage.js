import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col } from 'react-bootstrap';
import ListStockProduct from '../components/ListStockProduct';
import StockManagement from '../components/StockManagement';
import SearchStock from '../components/SearchStock';
import { parseCookies } from 'nookies';
import { gql, useQuery, useMutation } from '@apollo/client';
import swal from 'sweetalert';

const productStocks = gql`
  query MyQuerys($userLoginId: Int!) {
    products(where: { user_id: { _eq: $userLoginId } }, order_by: { name: asc }) {
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
      id
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

const insertStockInDetails = gql`
  mutation MyMutation($objectDetails: stock_in_details_insert_input!) {
    insert_stock_in_details_one(object: $objectDetails) {
      product_id
      qty
      stock_ins_id
    }
  }
`;

const inserStockIns = gql`
  mutation MyMutation {
    insert_stock_ins(objects: {}) {
      returning {
        id
      }
    }
  }
`;

const updateQtyProductStocks = gql`
  mutation MyMutation($idc: Int!, $quantityc: Int!) {
    update_products_by_pk(pk_columns: { id: $idc }, _set: { quantity: $quantityc }) {
      id
    }
  }
`;

const StockMoments = [];

function StockPage() {
  const cookies = parseCookies();
  const { loading, error, data } = useQuery(productStocks, {
    variables: {
      userLoginId: cookies.id,
    },
  });
  const [insertStockInDetail] = useMutation(insertStockInDetails, { refetchQueries: [productStocks] });
  const [inserStockIn] = useMutation(inserStockIns, { refetchQueries: [productStocks] });
  const [updateQtyProductStockreg] = useMutation(updateQtyProductStocks, { refetchQueries: [productStocks] });

  const [stockMoment, setStockMoment] = useState(StockMoments);
  const [valueIdx, setValueIdx] = useState(0);
  const [valueId, setValueId] = useState(0);
  const [valueName, setValueName] = useState('');
  const [valueUnit, setValueUnit] = useState('');
  const [valueQtyOld, setValueQtyOld] = useState(0);
  const [valueQtyNew, setValueQtyNew] = useState(1);
  const [valueBool, setValueBool] = useState(false);
  const [searchObject, setSearchObject] = useState('');
  const [searchObjectBool, setSearchObjectBool] = useState(false);

  const handleInsertValueStockMoment = (idx, idtake, nametake, qtytake, unittake) => {
    setValueIdx(idx);
    setValueId(idtake);
    setValueName(nametake);
    setValueQtyOld(qtytake);
    setValueUnit(unittake);
    setValueBool(true);
  };

  const handleInsertStockMoment = () => {
    setStockMoment((prev) => [
      ...prev,
      {
        idx: valueIdx,
        id: valueId,
        name: valueName,
        qty: valueQtyOld,
        qtyadd: parseInt(valueQtyNew),
        qtytotal: parseInt(parseInt(valueQtyOld) + parseInt(valueQtyNew)),
        stockInIdx: data.stock_ins.length + 1,
      },
    ]);

    setValueQtyNew(1);
    setValueBool(false);
  };
  const handleOnChangeValueQtyNew = (e) => {
    setValueQtyNew(e.target.value);
  };
  const handleClearAllValue = () => {
    setStockMoment([]);
    setValueBool(false);
  };
  const handleClearOneValue = (idc) => {
    const newStockMoment = stockMoment.filter((vd) => vd.idx !== idc);
    setStockMoment(newStockMoment);
    // setValueBool(false);
  };

  const handleSearchObject = (e) => {
    setSearchObject(e.target.value);
    if (searchObject === '') {
      setSearchObjectBool(false);
    } else {
      setSearchObjectBool(true);
    }
  };

  const handleOnAddStockIn = (objectss) => {
    inserStockIn();
    swal({
      title: 'Are you sure ?',
      text: 'Ur product quantity will update',

      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
        });
        objectss.map((stock) => {
          insertStockInDetail({
            variables: {
              objectDetails: {
                product_id: stock.id,
                qty: stock.qtyadd,
                stock_ins_id: stock.stockInIdx,
              },
            },
          });

          updateQtyProductStockreg({
            variables: {
              idc: stock.id,
              quantityc: stock.qtytotal,
            },
          });
        });
        setStockMoment([]);
        setValueBool(false);
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={8}>
            <Col>
              <SearchStock searchObject={searchObject} handleSearchObject={handleSearchObject} />
            </Col>
            <Col>
              <ListStockProduct data={data} handleInsertValueStockMoment={handleInsertValueStockMoment} searchObject={searchObject} searchObjectBool={searchObjectBool} />
            </Col>
          </Col>
          <Col>
            <StockManagement
              stockMoment={stockMoment}
              valueIdx={valueIdx}
              valueId={valueId}
              valueName={valueName}
              valueUnit={valueUnit}
              valueQtyOld={valueQtyOld}
              valueQtyNew={valueQtyNew}
              handleOnChangeValueQtyNew={handleOnChangeValueQtyNew}
              valueBool={valueBool}
              handleInsertStockMoment={handleInsertStockMoment}
              handleClearAllValue={handleClearAllValue}
              handleClearOneValue={handleClearOneValue}
              handleOnAddStockIn={handleOnAddStockIn}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StockPage;
// onClick={() => handleIdRooms(product.id)}

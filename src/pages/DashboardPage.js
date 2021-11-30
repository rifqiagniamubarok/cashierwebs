import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ListDashboardProduct from '../components/ListDashboardProduct';
import NavbarComponent from '../components/NavbarComponent';
import OrderProduct from '../components/OrderProduct';
import SearchDashboard from '../components/SearchDashboard';
import { parseCookies, setCookie } from 'nookies';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { gql, useQuery, useMutation } from '@apollo/client';

const productCommon = gql`
  query MyQuery($userLoginId: Int!) {
    products(where: { user_id: { _eq: $userLoginId } }, order_by: { name: asc }) {
      id
      name
      price
      purchase_price
      quantity
      unit
      userProduct {
        company_name
        username
      }
    }
    orders {
      id
      orderDetails {
        product_id
      }
    }
  }
`;

const insertOrderDetails = gql`
  mutation MyMutation($orderDetail: order_details_insert_input!) {
    insert_order_details_one(object: $orderDetail) {
      product_id
      order_id
      quantity
      total_cost
    }
  }
`;

const insertOrders = gql`
  mutation MyMutation($orderInput: orders_insert_input = {}) {
    insert_orders_one(object: $orderInput) {
      total_cost
      total_pay
    }
  }
`;

const updateQtyProducts = gql`
  mutation MyMutation($idc: Int!, $quantityc: Int!) {
    update_products_by_pk(pk_columns: { id: $idc }, _set: { quantity: $quantityc }) {
      id
    }
  }
`;

const valueOrderInputs = [];

function DashboardPage() {
  const cookies = parseCookies();
  const { loading, error, data } = useQuery(productCommon, { variables: { userLoginId: cookies.id } });
  const [insertOrderDetail] = useMutation(insertOrderDetails, { refetchQueries: [productCommon] });
  const [insertOrder] = useMutation(insertOrders, { refetchQueries: [productCommon] });
  const [updateQtyProduct] = useMutation(updateQtyProducts, { refetchQueries: [productCommon] });

  // const [orderIdx, setOrderIdx] = useState(data.orders.length + 1);

  const navigate = useNavigate();
  const [valueOrderInput, setValueOrderInput] = useState(valueOrderInputs);
  const [valueOrderName, setValueOrderName] = useState('');
  const [valueOrderId, setValueOrderId] = useState(0);
  const [valueOrderIdx, setValueOrderIdx] = useState(0);
  const [valueOrderPurchasePrice, setValueOrderPurchasePrice] = useState(0);
  const [valueOrderPrice, setValueOrderPrice] = useState(0);

  const [valueOrderUnit, setValueOrderUnit] = useState('');
  const [valueOrderQtyOld, setValueOrderQtyOld] = useState(0);
  const [valueOrderQtyNew, setValueOrderQtyNew] = useState(1);
  const [valueOrderBool, setValueOrderBool] = useState(false);
  const [valueOrderTotalCost, setValueOrderTotalCost] = useState(0);
  const [valueOrderTotalPay, setValueOrderTotalPay] = useState(0);
  const [valueOrderPayCostBool, setValueOrderPayCostBool] = useState(true);
  const [searchObject, setSearchObject] = useState('');
  const [searchObjectBool, setSearchObjectBool] = useState(false);

  useEffect(() => {
    if (cookies.id === undefined) {
      navigate('/');
    }
  });

  const handleValueOrderTake = (idc, idtake, nametake, purchasepricetake, pricetake, unittake, qtytake) => {
    setValueOrderIdx(valueOrderIdx + 1);
    setValueOrderId(idtake);
    setValueOrderName(nametake);
    setValueOrderPurchasePrice(purchasepricetake);
    setValueOrderPrice(pricetake);

    setValueOrderUnit(unittake);
    setValueOrderQtyOld(qtytake);
    setValueOrderBool(true);
  };

  const handleValueOrder = () => {
    setValueOrderInput((prev) => [
      ...prev,
      {
        idx: valueOrderIdx,
        id: valueOrderId,
        name: valueOrderName,
        purchaseprice: valueOrderPurchasePrice,
        price: valueOrderPrice,
        unit: valueOrderUnit,
        qty: valueOrderQtyOld,
        qtymin: parseInt(valueOrderQtyNew),
        qtytotal: parseInt(parseInt(valueOrderQtyOld) - parseInt(valueOrderQtyNew)),
        pricetotal: parseInt(parseInt(valueOrderPrice) * parseInt(valueOrderQtyNew)),
        orderIdx: data.orders.length + 1,
      },
    ]);
    setValueOrderTotalCost(valueOrderTotalCost + parseInt(parseInt(valueOrderPrice) * parseInt(valueOrderQtyNew)));
    setValueOrderQtyNew(1);
    setValueOrderBool(false);
  };

  const handleOnChangeValueOrderQtyNew = (e) => {
    setValueOrderQtyNew(e.target.value);
  };

  const handelOnChangeTotalPay = (e) => {
    setValueOrderTotalPay(e.target.value);
  };

  const handleClearAllValueOrder = () => {
    setValueOrderInput([]);
    setValueOrderBool(false);
    setValueOrderTotalCost(0);
    setValueOrderTotalPay(0);
  };

  const handleClearOneValueOrder = (idc, totalprice) => {
    const newOrderValue = valueOrderInput.filter((vd) => vd.idx !== idc);
    setValueOrderInput(newOrderValue);
    setValueOrderTotalCost(valueOrderTotalCost - totalprice);
  };

  const handleSearchObject = (e) => {
    setSearchObject(e.target.value);
    if (searchObject === '') {
      setSearchObjectBool(false);
    } else {
      setSearchObjectBool(true);
    }
  };

  const handleOnAddOrder = () => {
    if (valueOrderTotalCost > valueOrderTotalPay) {
      setValueOrderPayCostBool(false);
    } else {
      insertOrder({
        variables: {
          orderInput: {
            total_cost: valueOrderTotalCost,
            total_pay: valueOrderTotalPay,
          },
        },
      });
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('Poof! Your imaginary file has been deleted!', {
            icon: 'success',
          });
          valueOrderInput.map((product) => {
            insertOrderDetail({
              variables: {
                orderDetail: {
                  product_id: product.id,
                  order_id: product.orderIdx,
                  quantity: product.qtymin,
                  total_cost: product.pricetotal,
                },
              },
            });
            updateQtyProduct({
              variables: {
                idc: product.id,
                quantityc: product.qtytotal,
              },
            });
          });
          setValueOrderInput([]);
          setValueOrderBool(false);
          setValueOrderTotalCost(0);
          setValueOrderTotalPay(0);
          setValueOrderPayCostBool(true);
          setCookie(null, 'checkout', valueOrderInput[0].orderIdx);
          navigate('/checkout');
        } else {
          swal('Your imaginary file is safe!');
        }
      });
    }
  };

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={7}>
            <c0l>
              <SearchDashboard searchObject={searchObject} handleSearchObject={handleSearchObject} />
            </c0l>
            <Col>
              <ListDashboardProduct data={data} handleValueOrderTake={handleValueOrderTake} searchObject={searchObject} searchObjectBool={searchObjectBool} />
            </Col>
          </Col>
          <Col>
            <OrderProduct
              valueOrderName={valueOrderName}
              valueOrderPrice={valueOrderPrice}
              valueOrderQtyNew={valueOrderQtyNew}
              handleOnChangeValueOrderQtyNew={handleOnChangeValueOrderQtyNew}
              handleValueOrder={handleValueOrder}
              valueOrderBool={valueOrderBool}
              valueOrderInput={valueOrderInput}
              valueOrderTotalCost={valueOrderTotalCost}
              valueOrderTotalPay={valueOrderTotalPay}
              handelOnChangeTotalPay={handelOnChangeTotalPay}
              handleClearAllValueOrder={handleClearAllValueOrder}
              handleClearOneValueOrder={handleClearOneValueOrder}
              handleOnAddOrder={handleOnAddOrder}
              valueOrderPayCostBool={valueOrderPayCostBool}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardPage;

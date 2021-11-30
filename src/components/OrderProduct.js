import React from 'react';
import '../styles/dashboard.css';
import { Table } from 'react-bootstrap';
import { RiDeleteBin6Fill } from 'react-icons/ri';

function OrderProduct({
  valueOrderName,
  valueOrderPrice,
  valueOrderQtyNew,
  handleOnChangeValueOrderQtyNew,
  handleValueOrder,
  valueOrderBool,
  valueOrderInput,
  valueOrderTotalCost,
  valueOrderTotalPay,
  handelOnChangeTotalPay,
  handleClearAllValueOrder,
  handleClearOneValueOrder,
  handleOnAddOrder,
  valueOrderPayCostBool,
}) {
  return (
    <div className="order-bingkai-component">
      <div className="total-cost">
        <h1>Rp. {valueOrderTotalCost}</h1>
      </div>
      <div className="table-cost">
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>@Price</th>
              <th className="text-center">Qty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {valueOrderInput.map((product, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{product.name}</td>
                <td style={{ color: '#F77F00', fontWeight: '700' }}>Rp.{product.pricetotal}</td>
                <td style={{ color: '#40916C', fontWeight: '700' }}>Rp.{product.price}</td>
                <td className="text-center">{product.qtymin}</td>
                <td>
                  <RiDeleteBin6Fill style={{ cursor: 'pointer' }} onClick={() => handleClearOneValueOrder(product.idx, product.pricetotal)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {valueOrderBool === true ? (
        <div className="inputorder-line">
          <span> {valueOrderName}</span>
          <span> {valueOrderPrice}</span>
          <span>
            <input type="number" value={valueOrderQtyNew} onChange={handleOnChangeValueOrderQtyNew} />
            <button onClick={handleValueOrder}>add</button>
          </span>
          <span>{valueOrderPrice * valueOrderQtyNew}</span>
        </div>
      ) : (
        <span></span>
      )}

      <div>
        <h4>Total Cost : Rp. {valueOrderTotalCost}</h4>
        <hr />
      </div>
      {valueOrderPayCostBool === false ? <p style={{ color: 'red', textAlign: 'center' }}>cash not enough</p> : <span></span>}
      <div className="payment-order">
        <p>CASH : Rp.</p>
        <input value={valueOrderTotalPay} onChange={handelOnChangeTotalPay} />
        <button className="yl-button" onClick={handleClearAllValueOrder}>
          CANCEL
        </button>
        <button className="gr-button" onClick={handleOnAddOrder}>
          PAY
        </button>
      </div>
    </div>
  );
}

export default OrderProduct;

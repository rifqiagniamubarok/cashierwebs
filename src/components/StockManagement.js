import React from 'react';
import '../styles/stock.css';
import { Table, Col } from 'react-bootstrap';
import { RiDeleteBin6Fill } from 'react-icons/ri';
// import { width } from 'dom-helpers';
// import { Button } from 'react-bootstrap';

function StockManagement({ stockMoment, valueIdx, valueId, valueName, valueUnit, valueQtyOld, valueQtyNew, handleOnChangeValueQtyNew, valueBool, handleInsertStockMoment, handleClearAllValue, handleClearOneValue, handleOnAddStockIn }) {
  return (
    <div className="bingkai-component stockmanagement-component">
      <h3>Stock Management</h3>
      <div className="table-s">
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Qty Now</th>
              <th>Add Qty</th>
            </tr>
          </thead>

          <tbody>
            {stockMoment.map((stokIn, idc) => (
              <tr>
                <td>{idc + 1}</td>
                <td>{stokIn.name}</td>
                <td>{stokIn.qty}</td>
                <td>{stokIn.qtyadd}</td>
                <td>
                  <RiDeleteBin6Fill onClick={() => handleClearOneValue(stokIn.idx)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <hr />
      {valueBool === true ? (
        <div className="line-ValueInput ">
          <Col style={{ marginRight: '20%', marginLeft: '10px' }}>{valueName}</Col>
          <Col className="offset">
            <span>
              <input type="number" value={valueQtyNew} onChange={handleOnChangeValueQtyNew} />
              <button onClick={handleInsertStockMoment}>add</button>
            </span>
          </Col>
        </div>
      ) : (
        <span></span>
      )}
      <div>
        <button className="clearstock-button" onClick={handleClearAllValue}>
          CLEAR
        </button>
        <button className="addstock-button" onClick={() => handleOnAddStockIn(stockMoment)}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default StockManagement;

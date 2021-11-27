import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/item.css';

function ItemManagement({ nameReg, unitReg, purchasePriceReg, priceReg, qtyReg, handleChangeUsername, handleChangeUnit, handleChangePurchasePrice, handleChangePrice, handleChangeQty, handleClear, handleSubmit, addOrEdit, handleEditMode }) {
  return (
    <div className="bingkai-component itemmanagement-component">
      <h3>Item Management</h3>
      <form onSubmit={handleSubmit}>
        <label for="name">Name :</label>
        <input type="text" id="name" value={nameReg} onChange={handleChangeUsername} />
        <label for="unit">Unit :</label>
        <input type="text" id="unit" value={unitReg} onChange={handleChangeUnit} />
        <label for="purchaseprice">Purchase Price :</label>
        <input type="number" id="purchaseprice" value={purchasePriceReg} onChange={handleChangePurchasePrice} />
        <label for="price">Price :</label>
        <input type="number" id="price" value={priceReg} onChange={handleChangePrice} />
        {addOrEdit === false ? <span></span> : <label for="qty">First Stock :</label>}
        {addOrEdit === false ? <span></span> : <input type="number" value={qtyReg} id="qty" onChange={handleChangeQty} />}
        {addOrEdit === true ? (
          <span></span>
        ) : (
          <Button className="cc-button" onClick={handleEditMode}>
            CANCEL
          </Button>
        )}
        <Button className="yl-button " id="yel" onClick={handleClear}>
          CLEAR
        </Button>
        <Button className="gr-button " id="gr" type="submit">
          {addOrEdit === true ? 'ADD' : 'EDIT'}
        </Button>
      </form>
    </div>
  );
}

export default ItemManagement;

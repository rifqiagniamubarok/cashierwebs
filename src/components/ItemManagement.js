import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/item.css';

function ItemManagement() {
  return (
    <div className="bingkai-component itemmanagement-component">
      <h3>Item Management</h3>
      <form>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Unit" />
        <input type="text" placeholder="Purchase Price" />
        <input type="text" placeholder="Price" />
        <input type="text" placeholder="First Stock" />
        <Button className="yl-button " id="yel">
          CLEAR
        </Button>
        <Button className="gr-button " id="gr" type="submit">
          ADD
        </Button>
      </form>
    </div>
  );
}

export default ItemManagement;

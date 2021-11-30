import React from 'react';

function CheckOutComponent({ data }) {
  return (
    <div xs={7} className="bingkai-component">
      <h1>{data.users[0].company_name}</h1>
      <h6>by </h6>
      <h4>Cashier Web</h4>
      <div>
        <div xs={12}>
          <table className="table-borderless">
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>@Price</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>

            {data.order_details.map((product, ind) => (
              <tr>
                <td>{ind + 1}</td>
                <td>{product.getProduct.name}</td>
                <td>Rp. {product.getProduct.price}</td>
                <td>
                  {product.quantity} {product.getProduct.unit}
                </td>
                <td>Rp. {product.total_cost}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <hr />
      <div className="output-box">
        <div>
          <p className="textoutput"> TOTAL COST &ensp;: Rp. {data.orders[0].total_cost}</p>
        </div>
        <div>
          <p className="textoutput"> CASH &ensp; &ensp; &ensp; &ensp; &ensp; : Rp. {data.orders[0].total_pay}</p>
        </div>
        <div>
          <p className="textoutput"> CHANGE &ensp; &ensp;&ensp;&ensp;: Rp. {data.orders[0].total_pay - data.orders[0].total_cost}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckOutComponent;

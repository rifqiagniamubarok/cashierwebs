import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col } from 'react-bootstrap';
import ListAdminProduct from '../components/ListAdminProduct';
import ItemManagement from '../components/ItemManagement';
import SearchItem from '../components/SearchItem';
import { parseCookies } from 'nookies';
import { gql, useQuery, useMutation } from '@apollo/client';
import swal from 'sweetalert';

const productAdmin = gql`
  query MyQuery($userLoginId: Int!) {
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
  }
`;

const insertProducts = gql`
  mutation MyMutation($object1: products_insert_input!) {
    insert_products_one(object: $object1) {
      name
      unit
      purchase_price
      price
      quantity
      user_id
    }
  }
`;

const updateProducts = gql`
  mutation MyMutation($idd: Int!, $named: bpchar!, $priced: Int!, $purchase_priced: Int!, $unitd: bpchar!) {
    update_products_by_pk(pk_columns: { id: $idd }, _set: { name: $named, price: $priced, purchase_price: $purchase_priced, unit: $unitd }) {
      id
    }
  }
`;

const deleteProducts = gql`
  mutation MyMutation($idd: Int!) {
    delete_products_by_pk(id: $idd) {
      id
    }
  }
`;

function ItemPage() {
  const cookies = parseCookies();
  const LoginId = cookies.id;
  const { loading, error, data } = useQuery(productAdmin, { variables: { userLoginId: LoginId } });
  const [insertProductReg] = useMutation(insertProducts, { refetchQueries: [productAdmin] });
  const [updateProductReg] = useMutation(updateProducts, { refetchQueries: [productAdmin] });
  const [deleteProductReg] = useMutation(deleteProducts, { refetchQueries: [productAdmin] });

  const [addOrEdit, setAddOrUpdate] = useState(true);
  const [editId, setEditId] = useState(0);
  const [nameReg, setNameReg] = useState('');
  const [unitReg, setUnitReg] = useState('');
  const [purchasePriceReg, setPurchasePriceReg] = useState(0);
  const [priceReg, setPriceReg] = useState(0);
  const [qtyReg, setQtyReg] = useState(0);
  const [searchObject, setSearchObject] = useState('');
  const [searchObjectBool, setSearchObjectBool] = useState(false);

  const handleChangeUsername = (e) => {
    setNameReg(e.target.value);
  };
  const handleChangeUnit = (e) => {
    setUnitReg(e.target.value);
  };
  const handleChangePurchasePrice = (e) => {
    setPurchasePriceReg(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPriceReg(e.target.value);
  };
  const handleChangeQty = (e) => {
    setQtyReg(e.target.value);
  };
  const handleClear = () => {
    setNameReg('');
    setUnitReg('');
    setPurchasePriceReg(0);
    setPriceReg(0);
    setQtyReg(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addOrEdit === true) {
      insertProductReg({
        variables: {
          object1: {
            name: nameReg,
            unit: unitReg,
            purchase_price: purchasePriceReg,
            price: priceReg,
            quantity: qtyReg,
            user_id: cookies.id,
          },
        },
      });
      swal('Success!', 'succes to add product', 'success');
      setNameReg('');
      setUnitReg('');
      setPurchasePriceReg(0);
      setPriceReg(0);
      setQtyReg(0);
    } else if (addOrEdit === false) {
      updateProductReg({
        variables: {
          idd: editId,
          named: nameReg,
          priced: priceReg,
          purchase_priced: purchasePriceReg,
          unitd: unitReg,
        },
      });
      swal('Success!', 'succes to Edit product', 'success');
      setAddOrUpdate(true);
      setNameReg('');
      setUnitReg('');
      setPurchasePriceReg(0);
      setPriceReg(0);
      setQtyReg(0);
    }
  };

  const handleItemEdit = (idItem, nameItem, purchasePriceItem, priceItem, unitItem) => {
    setEditId(idItem);
    setNameReg(nameItem);
    setPriceReg(purchasePriceItem);
    setPurchasePriceReg(priceItem);
    setUnitReg(unitItem);
    setAddOrUpdate(false);
  };

  const handleEditMode = () => {
    setAddOrUpdate(true);
    setNameReg('');
    setUnitReg('');
    setPurchasePriceReg(0);
    setPriceReg(0);
    setQtyReg(0);
  };

  const handleDelete = (idItem) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProductReg({
          variables: {
            idd: idItem,
          },
        });
        swal('Success!', 'succes to Delete product', 'success');
        swal('Poof! Your product data has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your product data is safe!');
      }
    });
  };

  const handleSearchObject = (e) => {
    setSearchObject(e.target.value);
    if (searchObject === '') {
      setSearchObjectBool(false);
    } else {
      setSearchObjectBool(true);
    }
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
              <SearchItem searchObject={searchObject} handleSearchObject={handleSearchObject} />
            </Col>
            <Col>
              <ListAdminProduct data={data} handleItemEdit={handleItemEdit} handleDelete={handleDelete} searchObject={searchObject} searchObjectBool={searchObjectBool} />
            </Col>
          </Col>
          <Col>
            <h2>
              <ItemManagement
                nameReg={nameReg}
                unitReg={unitReg}
                purchasePriceReg={purchasePriceReg}
                priceReg={priceReg}
                qtyReg={qtyReg}
                handleChangeUsername={handleChangeUsername}
                handleChangeUnit={handleChangeUnit}
                handleChangePurchasePrice={handleChangePurchasePrice}
                handleChangePrice={handleChangePrice}
                handleChangeQty={handleChangeQty}
                handleClear={handleClear}
                handleSubmit={handleSubmit}
                addOrEdit={addOrEdit}
                setAddOrUpdate={setAddOrUpdate}
                handleEditMode={handleEditMode}
              />
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ItemPage;

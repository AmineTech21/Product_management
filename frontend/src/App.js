import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [productName, setProductName] = useState('');
  const [productTypeName, setProductTypeName] = useState('');
  const [attribute, setAttribute] = useState('');
  const [attributeValue, setAttributeValue] = useState('');
  // const [days, setDays] = useState(0);
  const [newProductName, setNewProductName] = useState('');
  const [productId, setProductId] = useState(0);
  const [productTypeId, setProductTypeId] = useState(0);

  const [productList, setProductList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/seeproducts').then((response) => {
      setProductList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/readtype').then((response) => {
      setProductTypeList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', {
      productName: productName,
      // days: days,
    });
  };

  const addTypeToList = () => {
    Axios.post('http://localhost:3001/inserttype', {
      productTypeName: productTypeName,
      attributeName: attribute,
      attributeValueName: attributeValue,
    });
  };

  const linkProduct = () => {
    Axios.get(`http://localhost:3001/productfinished/${productId}/${productTypeId}`);
  };

  const updateProduct = (id) => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      newProductName: newProductName,
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>Product Management System Releasin</h1>
      <div className="container">
        <div className="small__container">
          <h2>Create Product Type</h2>
          <input
            type="text"
            placeholder="Product Type Name..."
            onChange={(event) => {
              setProductTypeName(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Attribute (ex: Size, Color, etc...)..."
            onChange={(event) => {
              setAttribute(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="array"
            placeholder="Attribute Value (ex: S,M,L/Red, Blue)..."
            onChange={(event) => {
              setAttributeValue(event.target.value.split(','));
            }}
          />
        </div>

        <button
          style={{ display: 'block', margin: 'auto', marginTop: '1rem' }}
          onClick={addTypeToList}
        >
          Add Type to list
        </button>
      </div>

      <div className="container">
        <h2>Create Product Name</h2>
        <div>
          {/* <label>Product Name:</label> */}
          <input
            type="text"
            placeholder="Product Name..."
            onChange={(event) => {
              setProductName(event.target.value);
            }}
          />
        </div>

        <button
          style={{ display: 'block', margin: 'auto', marginTop: '1rem' }}
          onClick={addToList}
        >
          Add to list
        </button>
      </div>

      <div className="container">
        <h2>Link a product and a Type</h2>
        <div>
          <label>Choose product : </label>
          <select
            onChange={(event) => {
              setProductId(event.target.value);
            }}
          >
            <option>-</option>
            {productList.map((val, key) => {
              return (
                <>
                  <option className="" value={val._id} key={key}>
                    {val.productName}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        <div>
          <label>Choose type to link to your product : </label>
          <select
            onChange={(event) => {
              setProductTypeId(event.target.value);
            }}
          >
            <option>-</option>
            {productTypeList.map((val, key) => {
              return (
                <>
                  <option className="" value={val._id} key={key}>
                    {val.productTypeName}
                  </option>
                </>
              );
            })}
          </select>
          <button
            type="submit"
            style={{ display: 'block', margin: 'auto', marginTop: '1rem' }}
            onClick={() => {
              linkProduct();
            }}
          >
            Link product with type
          </button>
        </div>
      </div>

      <h1>Product List</h1>

      {productList.map((val, key) => {
        return (
          <div className="product" key={key}>
            <h1>Product Name : {val.productName} </h1>
            <input
              type="text"
              placeholder="New Product Name..."
              onChange={(event) => {
                setNewProductName(event.target.value);
              }}
            />
            <button onClick={() => updateProduct(val._id)}>Update</button>
            <button onClick={() => deleteProduct(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

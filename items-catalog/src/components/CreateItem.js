import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
 
function CreateItem(props) {
  const styleObj = {
    cursor: 'pointer'
  }
  const itemEmptyState = {
    name: "",
    description: "",
    dimension: "",
    available: true,
    color: [],
    catalogID: "",
  };
  const [singleItem, setSingleItem] = useState(itemEmptyState);
  const [catalogList, setCatalogList] = useState([]);
  const colorRef = useRef('');

  useEffect(async () => {
    let getCatalogList = await getCatalog();
    console.log(props.item)
    if (props.item) {
      setSingleItem(props.item[0]);
    }
  }, []);
 
  function getCatalog() {
    axios
      .get("http://localhost:8000/catalog")
      .then(function (response) {
        if (response.status === 200) {
          setCatalogList(response.data);
          if (singleItem.catalogID == '' && catalogList.length != 0) {
            setSingleItem((prevState) => ({
              ...prevState,
              catalogID: catalogList[0]._id,
            }));
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleChange(e) {
    e.persist();
    setSingleItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCheckedChange(e) {
    e.persist();
    setSingleItem((prevState) => ({
      ...prevState,
      available: !singleItem.available,
    }));
  }
 
  function handleColorChange(e) {
    if (e.charCode === 13) {
      setSingleItem((prevState) => ({
          ...prevState,
          color: [...singleItem.color, e.target.value]
      }));
      setTimeout(() => {
        colorRef.current.value = '';
      }, 1000);
    }
  }

  function createItem() {
    console.log(singleItem);
    axios
      .post("http://localhost:8000/items", singleItem)
      .then(function (response) {
        console.log(response);
        alert('Item Created');
        setSingleItem(itemEmptyState);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeColor(name) {
    setSingleItem((prevState) => ({
      ...prevState,
      color: singleItem.color.filter(eColor => eColor !== name)
    }));
  }
 
  return (
    <div className="container">
      <h1 className="text-primary">{props.title ? props.title + ' Item' : 'Create Item'}</h1>
      <div className="mb-3">
        <label htmlFor="itemName" className="form-label">
          Item Name
        </label>
        <input
          type="text"
          className="form-control"
          id="itemName"
          placeholder="Please enter item name"
          value={singleItem.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemDesc" className="form-label">
          Item description
        </label>
        <input
          type="text"
          className="form-control"
          id="itemDesc"
          placeholder="Please enter item description"
          value={singleItem.description}
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemDim" className="form-label">
          Item dimension
        </label>
        <input
          type="text"
          className="form-control"
          id="itemDim"
          placeholder="Please enter item dimension"
          value={singleItem.dimension}
          name="dimension"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <p>Item Availability</p>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          name="available"
          type="checkbox"
          defaultChecked={singleItem.available}
          id="flexCheckDefault"
          onChange={(e) => handleCheckedChange(e)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Available
        </label>
      </div>
 
      <div className="mb-3">
        <label htmlFor="itemColor" className="form-label">
          Item Color
        </label>
        <input
          type="text"
          ref={colorRef}
          className="form-control"
          id="itemColor"
          placeholder="Please enter color and press enter"
          name="color"
          onKeyPress={(e) => handleColorChange(e)}
        />
      </div>

      {singleItem.color.length !==0 && <p className="mb-3">
      {singleItem.color.map((color,i) => <span className="mx-2 bg-info p-2" key={i}>{color}
        <svg style={styleObj} onClick={() => removeColor(color)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </span>)}
      </p>}

      <p>Select Catalog</p>
      <select
        className="form-select mb-3"
        aria-label="Default select example"
        name="catalogID"
        onChange={(e) => handleChange(e)}
      >
        {catalogList.length !== 0 &&
          catalogList.map((catalog) => (
            <option value={catalog._id} key={catalog._id}>
              {catalog.name}
            </option>
          ))}
      </select>
 
      <div className="col-12 mb-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => createItem()}
        >
          {props.title ? props.title : 'Create'}
        </button>
      </div>
    </div>
  );
}
export default CreateItem;
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateItem from "./CreateItem";

function ItemsList() {
  const [itemsList, setItemsList] = useState([]);
  const [itemsListOnView, setItemsListOnView] = useState([]);
  const [toggleAvailable, setToggleAvailable] = useState(true);
  const [editItem, setEditItem] = useState([]);
  const styleObj = {
    cursor: 'pointer'
  }
  useEffect(function () {
    axios
      .get("http://localhost:8000/items")
      .then(function (response) {
        if (response.status === 200) {
          setItemsList(response.data);
          let itemlist = response.data.filter(list => list.available == true);
          setItemsListOnView(itemlist);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleCheckedChange(e) {
    let itemlist = itemsList.filter(list => list.available == !toggleAvailable);
    setItemsListOnView(itemlist);
    setToggleAvailable(!toggleAvailable);
  }

  function deleteItem(id) {
    axios
      .get("http://localhost:8000/items/delete/"+id)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          alert('deleted successfully')
          setItemsList(itemsList.filter((item) => item._id != id))
          setItemsListOnView(itemsListOnView.filter((item) => item._id != id))
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container py-5">
      <h1 className="text-primary">Items List</h1>
      <div className="form-check form-switch my-3">
        <input className="form-check-input" type="checkbox" 
          defaultChecked={toggleAvailable} id="flexSwitchAvailable" onChange={(e) => handleCheckedChange(e)}/>
        <label className="form-check-label" htmlFor="flexSwitchAvailable">Switch table based on Available</label>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Dimension</td>
            <td>Catalog ID</td>
            <td>Available</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {itemsListOnView.length !== 0 &&
            itemsListOnView.map((eachItem) => (
              <tr key={eachItem._id}>
                <td>{eachItem.name}</td>
                <td>{eachItem.description}</td>
                <td>{eachItem.dimension}</td>
                <td>{eachItem.catalogID}</td>
                <td>{eachItem.available ? "Yes" : "No"}</td>
                <td>
                  <svg style={styleObj} onClick={() => setEditItem([eachItem])} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </td>
                <td>
                  <svg style={styleObj} onClick={() => deleteItem(eachItem._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr/>
      {editItem.length != 0 && <CreateItem
        title="Update"
        item={editItem}
      />}
    </div>
  );
}
export default ItemsList;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Catalog() {
  const [catalogName, setCatalogName] = useState("");
  const [catalogList, setCatalogList] = useState([]);
  useEffect(function () {
    axios
      .get("http://localhost:8000/catalog")
      .then(function (response) {
        if (response.status === 200) {
          setCatalogList(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function createCatalog() {
    if (!catalogName) {
      return alert("Please enter catalog name");
    }
    axios
      .post("http://localhost:8000/catalog", {
        name: catalogName,
      })
      .then(function (response) {
        if (response.status === 200) {
          setCatalogList([...catalogList, response.data]);
          setCatalogName("");
        }

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container py-5">
      <h1 className="text-primary">Create Catalog</h1>
      <div className="mb-3">
        <label htmlFor="catalogName" className="form-label">
          Catalog Name
        </label>
        <input
          type="text"
          className="form-control"
          id="catalogName"
          value={catalogName}
          placeholder="Please enter catalog name"
          onChange={(e) => setCatalogName(e.target.value)}
        />
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => createCatalog()}
        >
          Create
        </button>
      </div>
      <hr />
      <h1 className="text-primary">View Catalog </h1>
      <ul>
        {catalogList.length !== 0 &&
          catalogList.map((catalog) => (
            <li key={catalog._id}>{catalog.name}</li>
          ))}
      </ul>
    </div>
  );
}
export default Catalog;

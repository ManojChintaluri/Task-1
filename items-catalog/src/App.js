import './App.css';
import Catalog from './components/Catalog';
import Items from './components/Items';
import React from "react";


function App() {
  return (
    <div className="App">
      <nav className="navbar px-3 navbar-light bg-light">
        <div>
          <span className="navbar-brand mb-0 h1">Item Catalog</span>
        </div>
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Catalog</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Items</button>
          </li>

        </ul>
      </nav>

      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <Catalog />
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <Items />
        </div>

      </div>
    </div>
  );
}

export default App;

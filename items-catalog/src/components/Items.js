import React from "react";
import CreateItem from "./CreateItem";
import ItemsList from "./ItemsList";
 
function Items() {
 
  return (
    <div className="container py-5">
      <CreateItem />
      <hr/>
     	<ItemsList />
    </div>
  );
}
export default Items;
 


import React, { useState } from "react";
import AdminCSS from "./admin.module.css";

function Admin() {
  let [product_name, setProductName] = useState("");
  let [product_price, setProductPrice] = useState("");
  let [product_discription, setProductDiscription] = useState("");
  let [product_url, setProductUrl] = useState("");
  let [array, setarray] = useState(getProductListFromStorage());
  let [add_products_button, set_add_products_button] = useState(true);
  let [product_quantity, setProductQuantity] = useState("");

  let arr = [];

  function getProductListFromStorage() {
    let array = localStorage.getItem("Products_details");
    array = array ? JSON.parse(array) : [];
    return array;
  }

  function backToLogin() {
    window.open("/login", "_self");
  }

  function addProduct(e) {
    e.preventDefault();

    array = localStorage.getItem("Products_details");
    array = array ? JSON.parse(array) : [];

    array.push({
      product_name,
      product_price,
      product_discription,
      product_url,
      id: Math.floor(Math.random() * 1000),
      product_quantity,
      current_product_quantity: 0,
    });

    console.log(product_name);

    localStorage.setItem("Products_details", JSON.stringify(array));
    setarray(array);

    // clearing the input values

    setProductName("");
    setProductPrice("");
    setProductDiscription("");
    setProductUrl("");
    setProductQuantity("");
  }

  function updateProduct(e) {
    e.preventDefault();

    array = JSON.parse(localStorage.getItem("Products_details"));
    array.push({
      product_name,
      product_price,
      product_url,
      product_discription,
      id: Math.floor(Math.random() * 1000),
      product_quantity,
      current_product_quantity: 0,
    });
    setarray(array);

    setProductName("");
    setProductPrice("");
    setProductDiscription("");
    setProductUrl("");
    setProductQuantity("");

    set_add_products_button(true);

    localStorage.setItem("Products_details", JSON.stringify(array));
  }

  // When user clicks on update button

  function update_product(e) {
    console.log(e);
    arr = array.filter((element) => e === element.id);
    console.log(arr);

    // putting value in form

    setProductName(arr[0].product_name);
    setProductPrice(arr[0].product_price);
    setProductDiscription(arr[0].product_discription);
    setProductUrl(arr[0].product_url);
    setProductQuantity(arr[0].product_quantity);

    // opeing the update product from

    set_add_products_button(false);

    array = array.filter((element) => e !== element.id);
    console.log(array);

    localStorage.setItem("Products_details", JSON.stringify(array));
  }

  // deleting the product

  function delete_product(e) {
    array = array.filter((element) => e !== element.id);

    localStorage.setItem("Products_details", JSON.stringify(array));
    setarray(array);
  }

  return (
    <div>
      <div className={AdminCSS.header}>
        <h1>Welcome Admin</h1>
        <button onClick={backToLogin} className={AdminCSS.btn}>
          Logout
        </button>
      </div>

      {add_products_button ? (
        <form onSubmit={addProduct}>
          <div className="text-center" className={AdminCSS.product_details}>
            <input
              required
              placeholder="Enter Product Name"
              onChange={(event) => setProductName(event.target.value)}
              value={product_name}
            />

            <input
              required
              placeholder="Enter Product Price"
              onChange={(event) => setProductPrice(event.target.value)}
              value={product_price}
            />

            <input
              required
              placeholder="Enter Product Description"
              onChange={(event) => setProductDiscription(event.target.value)}
              value={product_discription}
            />
            <input
              required
              placeholder="Enter Product Quantity"
              onChange={(event) => setProductQuantity(event.target.value)}
              value={product_quantity}
            />
            <input
              placeholder="Enter Image Url...."
              onChange={(event) => setProductUrl(event.target.value)}
              value={product_url}
            />

            <div className="text-center">
              <button className={AdminCSS.add_btn}>Add Products</button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={updateProduct}>
          <div className="text-center" className={AdminCSS.product_details}>
            <input
              required
              placeholder="Enter Product Name"
              onChange={(event) => setProductName(event.target.value)}
              value={product_name}
            />

            <input
              required
              placeholder="Enter Product Price"
              onChange={(event) => setProductPrice(event.target.value)}
              value={product_price}
            />

            <input
              required
              placeholder="Enter Product Description"
              onChange={(event) => setProductDiscription(event.target.value)}
              value={product_discription}
            />

            <input
              required
              placeholder="Enter Product Quantity"
              onChange={(event) => setProductQuantity(event.target.value)}
              value={product_quantity}
            />

            <input
              placeholder="Enter Image Url...."
              onChange={(event) => setProductUrl(event.target.value)}
              value={product_url}
            />
            <div className="text-center">
              <button className={AdminCSS.add_btn}>Update Product</button>
            </div>
          </div>
        </form>
      )}
      <div className={AdminCSS.product_box}>
        <div className="row">
          {array.map((element) => {
            return (
              <div id={element.id} key={element.id} className="col-sm-4">
                <div className={AdminCSS.product_container}>
                  <img className={AdminCSS.image} src={element.product_url} />
                  <div className={AdminCSS.name_block}>
                    <p>Name:</p>
                    <div className={AdminCSS.fix}>{element.product_name}</div>
                  </div>
                  <div className={AdminCSS.price_box}>
                    <p>Price:</p>
                    <div className={AdminCSS.fix}>{element.product_price}</div>
                  </div>
                  <div className={AdminCSS.discription_box}>
                    <p>Discription:</p>
                    <div className={AdminCSS.fix}>
                      {element.product_discription}
                    </div>
                  </div>
                  <div className={AdminCSS.button_box}>
                    <button
                      onClick={() => update_product(element.id)}
                      className={AdminCSS.update}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => delete_product(element.id)}
                      className={AdminCSS.delete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;

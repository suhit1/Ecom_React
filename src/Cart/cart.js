import React, { useState } from "react";
import CartCSS from "./cart.module.css";
import Modal from "react-modal";

function Cart() {
  let [items, setItems] = useState(getfromstorage());
  let [img, setImg] = useState("");
  let [body, setBody] = useState("");
  const [modal, setModal] = useState(false);

  function getfromstorage() {
    let arr = localStorage.getItem("cart");
    arr = arr ? JSON.parse(arr) : [];
    console.log(arr);

    if (arr.length === 0) return [];
    else {
      let user = localStorage.getItem("loged_in_user");
      user = user ? JSON.parse(user) : "";
      console.log(user);
      if (user) {
        let arry = arr.filter((element) => {
          if (element.user === user) return true;
        });
        console.log(arry);
        return arry;
        setItems(arry);
      } else {
        alert("Log in First");
        window.open("/login", "_self");
      }
    }
  }

  // when we click on view discription

  function viewDiscription(e) {
    let arr = JSON.parse(localStorage.getItem("Products_details"));

    arr = arr.filter((element) => {
      if (e === element.id) return true;
    });

    img = arr[0].product_url;
    body = arr[0].product_discription;

    console.log(arr);

    setImg(img);
    setBody(body);
    setModal(true);
  }

  // when we click on remove button

  function remove(e) {
    let arr = JSON.parse(localStorage.getItem("cart"));
    let array = JSON.parse(localStorage.getItem("cart"));
    let user = JSON.parse(localStorage.getItem("loged_in_user"));

    arr = arr.filter((element) => {
      if (element.user !== user) return true;
    });

    array = array.filter((element) => element.user === user);
    console.log(`Non user`);
    console.log(arr);
    console.log(`user`);
    console.log(array);
    array = array.filter((element) => element.id !== e);
    console.log(`after removal`);
    console.log(array);
    if (array.length) {
      console.log(array[0].product_name);
      let product_name = array[0].product_name;
      let product_discription = array[0].product_discription;
      let product_price = array[0].product_price;
      let product_quantity = array[0].product_quantity;
      let product_url = array[0].product_url;
      let id = array[0].id;
      arr.push({
        product_name,
        product_price,
        product_discription,
        product_quantity,
        product_url,
        id,
        user,
        product_present_quantity: 0,
      });
    }
    console.log(`at end`);
    console.log(arr);
    setItems(array);
    localStorage.setItem("cart", JSON.stringify(arr));
  }

  // add counter

  function plus(e) {
    // e is element set by admin
    console.log(e);

    let cart = JSON.parse(localStorage.getItem("cart"));
    let user = JSON.parse(localStorage.getItem("loged_in_user"));

    cart = cart.map((element) => {
      if (element.user === user && element.id === e.id) {
        if (element.product_quantity > element.product_present_quantity) {
          element.plus = false;
          element.minus = false;
          element.product_present_quantity++;
        } else {
          element.plus = true;
          element.minus = false;
        }
      }
      return element;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    setItems(cart);
  }

  //minus counter

  function minus(e) {
    // e is element set by admin
    console.log(e);

    let cart = JSON.parse(localStorage.getItem("cart"));
    let user = JSON.parse(localStorage.getItem("loged_in_user"));

    cart = cart.map((element) => {
      if (element.user === user && element.id === e.id) {
        if (element.product_present_quantity > 0) {
          element.plus = false;
          element.minus = false;
          element.product_present_quantity--;
        } else {
          element.minus = true;
          element.plus = false;
        }
      }
      return element;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    setItems(cart);
  }

  // when we click on checkout

  function checkout() {
    let user = localStorage.getItem("loged_in_user");
    user = user ? JSON.parse(user) : "";

    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    cart = cart.filter((element) => {
      if (element.user === user) return true;
    });

    if (cart.length !== 0)
      alert("Successfully purchased items will be delieverd to you");
    else alert("Your Cart Is Empty");
  }

  // go to product page

  function goback() {
    window.open("/customer", "_self");
  }

  return (
    <div>
      <div className={CartCSS.top}>
        <button onClick={() => checkout()} className={CartCSS.checkout}>
          Check Out
        </button>
        <button onClick={() => goback()} className={CartCSS.checkout}>
          Go back to product page
        </button>
      </div>
      <h2>Cart...!!!!</h2>
      <div className={CartCSS.box}>
        <div className="row">
          {items.map((element) => {
            return (
              <div id={element.id} key={element.id} className="col-sm-4">
                <div className={CartCSS.product_container}>
                  <img className={CartCSS.image} src={element.product_url} />
                  <div className={CartCSS.name_block}>
                    <p>Name:</p>
                    <div className={CartCSS.fix}>{element.product_name}</div>
                  </div>
                  <div className={CartCSS.price_box}>
                    <p>Price:</p>
                    <div className={CartCSS.fix}>{element.product_price}</div>
                  </div>
                  <div className={CartCSS.quantity_box}>
                    <p>Quantity: {element.product_present_quantity}</p>
                    <button
                      disabled={element.plus}
                      onClick={() => plus(element)}
                      className={CartCSS.plus_btn}
                    >
                      +
                    </button>
                    <button
                      disabled={element.minus}
                      onClick={() => minus(element)}
                      className={CartCSS.minus_btn}
                    >
                      -
                    </button>
                  </div>
                  <div className={CartCSS.button_box}>
                    <button
                      onClick={() => remove(element.id)}
                      className={CartCSS.remove}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => viewDiscription(element.id)}
                      className={CartCSS.view_discription}
                    >
                      View Disc.
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* modal */}

      <Modal
        className={CartCSS.modal}
        isOpen={modal}
        onRequestClose={() => setModal(false)}
      >
        <button className={CartCSS.close_btn} onClick={() => setModal(false)}>
          X
        </button>
        <div className="text-center">
          <img className={CartCSS.img} src={img}></img>
        </div>
        <h3>{body}</h3>
      </Modal>
    </div>
  );
}

export default Cart;
